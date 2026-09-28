"use client";

import { Icon } from "@iconify/react";
import { useState, type FormEvent, type ReactNode } from "react";
import { areaTypes, deadlineOptions, deliveryOptions } from "@/lib/content";
import { emptyLead, maskPhone, validateLead, type Lead, type LeadErrors } from "@/lib/lead";

type Status = "idle" | "sending" | "sent" | "error";

export default function LeadForm() {
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  function set<K extends keyof Lead>(key: K, value: Lead[K]) {
    setLead((l) => ({ ...l, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateLead(lead);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, website: honeypot }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-5 py-6" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon icon="solar:check-circle-bold" className="text-3xl" />
        </span>
        <h3 className="text-ink">Pedido recebido, {lead.nome.trim().split(" ")[0]}!</h3>
        <p className="max-w-md text-neutral-600">
          A equipe vai te chamar no WhatsApp <strong className="tabular text-ink">{lead.whatsapp}</strong> para entender
          sua área e montar o orçamento.
        </p>
        <button
          type="button"
          onClick={() => {
            setLead(emptyLead);
            setStatus("idle");
          }}
          className="btn btn-outline"
        >
          <span>Novo pedido</span>
          <div className="fill" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      {/* honeypot anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <Field id="nome" label="Nome" error={errors.nome}>
        <input
          id="f-nome"
          className="input-animated"
          placeholder="Seu nome"
          autoComplete="name"
          value={lead.nome}
          onChange={(e) => set("nome", e.target.value)}
          {...invalid("nome", errors)}
        />
      </Field>

      <Field id="whatsapp" label="WhatsApp" error={errors.whatsapp}>
        <input
          id="f-whatsapp"
          className="input-animated tabular"
          placeholder="(66) 99999-9999"
          inputMode="tel"
          autoComplete="tel-national"
          value={lead.whatsapp}
          onChange={(e) => set("whatsapp", maskPhone(e.target.value))}
          {...invalid("whatsapp", errors)}
        />
      </Field>

      <Field id="cidade" label="Cidade" error={errors.cidade}>
        <input
          id="f-cidade"
          className="input-animated"
          placeholder="Sinop, MT"
          autoComplete="address-level2"
          value={lead.cidade}
          onChange={(e) => set("cidade", e.target.value)}
          {...invalid("cidade", errors)}
        />
      </Field>

      <Field id="metragem" label="Metragem aproximada" hint="opcional">
        <input
          id="f-metragem"
          className="input-animated"
          placeholder="Ex.: 200 m de perímetro"
          value={lead.metragem}
          onChange={(e) => set("metragem", e.target.value)}
        />
      </Field>

      <ChipGroup
        name="tipoArea"
        label="Tipo de área"
        options={areaTypes}
        value={lead.tipoArea}
        onChange={(v) => set("tipoArea", v)}
        error={errors.tipoArea}
        className="sm:col-span-2"
      />

      <Field id="oQueCercar" label="O que você deseja cercar?" hint="opcional" className="sm:col-span-2">
        <input
          id="f-oQueCercar"
          className="input-animated"
          placeholder="Ex.: fundo da chácara, piquete para gado, frente do terreno..."
          value={lead.oQueCercar}
          onChange={(e) => set("oQueCercar", e.target.value)}
        />
      </Field>

      <ChipGroup
        name="entrega"
        label="Precisa de entrega?"
        options={deliveryOptions}
        value={lead.entrega}
        onChange={(v) => set("entrega", v)}
      />

      <Field id="prazo" label="Prazo de compra" hint="opcional">
        <select id="f-prazo" className="input-animated" value={lead.prazo} onChange={(e) => set("prazo", e.target.value)}>
          <option value="">Selecione</option>
          {deadlineOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field id="mensagem" label="Mensagem adicional" hint="opcional" error={errors.mensagem} className="sm:col-span-2">
        <textarea
          id="f-mensagem"
          className="input-animated min-h-24 resize-y"
          placeholder="Altura da cerca, tipo de terreno, se precisa de mourão..."
          value={lead.mensagem}
          onChange={(e) => set("mensagem", e.target.value)}
          {...invalid("mensagem", errors)}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full uppercase tracking-[0.06em]" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Icon icon="svg-spinners:ring-resize" className="text-lg" />
              Enviando
            </>
          ) : (
            <>
              Enviar pedido de orçamento
              <Icon icon="solar:arrow-right-linear" className="text-lg" />
            </>
          )}
        </button>
        {status === "error" && (
          <p className="flex items-center gap-2 text-sm font-medium text-error" role="alert">
            <Icon icon="solar:danger-triangle-bold" />
            Não conseguimos enviar agora. Tente de novo em instantes.
          </p>
        )}
        <p className="micro text-center">Orçamento com orientação especializada · Atendimento em Sinop e região</p>
      </div>
    </form>
  );
}

function invalid(key: keyof Lead, errors: LeadErrors) {
  return {
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `e-${key}` : undefined,
  };
}

function Field({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="field-label">
        {label}
        {hint && <span className="field-hint">{hint}</span>}
      </label>
      {children}
      {error && <ErrorText id={`e-${id}`}>{error}</ErrorText>}
    </div>
  );
}

function ChipGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  className = "",
}: {
  name: keyof Lead;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  className?: string;
}) {
  return (
    <fieldset className={className} aria-describedby={error ? `e-${name}` : undefined}>
      <legend className="field-label">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o} className="relative">
            <input
              id={i === 0 ? `f-${name}` : undefined}
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="peer absolute opacity-0"
            />
            <span className="chip">{o}</span>
          </label>
        ))}
      </div>
      {error && <ErrorText id={`e-${name}`}>{error}</ErrorText>}
    </fieldset>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-error">
      {children}
    </p>
  );
}
