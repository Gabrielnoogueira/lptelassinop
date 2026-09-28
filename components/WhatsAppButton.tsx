"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { maskPhone, validateQuickLead, type LeadErrors, type QuickLead } from "@/lib/lead";
import { whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "redirecting" | "error";

/**
 * Único caminho para o WhatsApp na página. Antes de redirecionar, abre um modal
 * que captura nome e número (enviados ao /api/lead) para o time poder chamar
 * mesmo que a pessoa não mande a mensagem.
 */
export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<QuickLead>({ nome: "", whatsapp: "" });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const waUrl = whatsappLink(`Olá! Sou ${lead.nome.trim()}. Vim pelo site e quero um orçamento.`);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function set<K extends keyof QuickLead>(key: K, value: string) {
    setLead((l) => ({ ...l, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateQuickLead(lead);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`wa-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, tipo: "whatsapp" }),
      });
      if (!res.ok) throw new Error();
      setStatus("redirecting");
      window.location.assign(waUrl);
    } catch {
      setStatus("error");
    }
  }

  const busy = status === "sending" || status === "redirecting";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setStatus("idle");
          setOpen(true);
        }}
        aria-label="Falar no WhatsApp"
        aria-haspopup="dialog"
        className="btn btn-whatsapp fixed bottom-5 right-5 z-40 !h-14 !w-14 !p-0"
      >
        <Icon icon="solar:chat-round-dots-bold" className="text-2xl" />
      </button>

      <div className={`modal-backdrop ${open ? "open" : ""}`} onClick={close} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-title"
        aria-hidden={!open}
        inert={!open}
        className={`modal-panel rounded-lg bg-surface p-7 sm:p-8 ${open ? "open" : ""}`}
      >
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 id="wa-title" className="text-ink">
            Antes de ir para o WhatsApp
          </h3>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="text-neutral-400 transition-colors hover:text-accent"
          >
            <Icon icon="solar:close-circle-linear" className="text-2xl" />
          </button>
        </div>
        <p className="mb-6 text-sm text-neutral-600">
          Deixe seu nome e número. Se a conversa não abrir, nosso time chama você.
        </p>

        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <div>
            <label htmlFor="wa-nome" className="field-label">
              Nome
            </label>
            <input
              ref={firstFieldRef}
              id="wa-nome"
              className="input-animated"
              placeholder="Seu nome"
              autoComplete="name"
              value={lead.nome}
              onChange={(e) => set("nome", e.target.value)}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? "wa-e-nome" : undefined}
            />
            {errors.nome && (
              <p id="wa-e-nome" className="mt-1.5 text-xs font-medium text-error">
                {errors.nome}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="wa-whatsapp" className="field-label">
              WhatsApp
            </label>
            <input
              id="wa-whatsapp"
              className="input-animated tabular"
              placeholder="(66) 99999-9999"
              inputMode="tel"
              autoComplete="tel-national"
              value={lead.whatsapp}
              onChange={(e) => set("whatsapp", maskPhone(e.target.value))}
              aria-invalid={!!errors.whatsapp}
              aria-describedby={errors.whatsapp ? "wa-e-whatsapp" : undefined}
            />
            {errors.whatsapp && (
              <p id="wa-e-whatsapp" className="mt-1.5 text-xs font-medium text-error">
                {errors.whatsapp}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-whatsapp mt-2 w-full uppercase tracking-[0.06em]" disabled={busy}>
            {busy ? (
              <>
                <Icon icon="svg-spinners:ring-resize" className="text-lg" />
                {status === "redirecting" ? "Abrindo o WhatsApp" : "Enviando"}
              </>
            ) : (
              <>
                <Icon icon="solar:chat-round-dots-bold" className="text-lg" />
                Continuar para o WhatsApp
              </>
            )}
          </button>

          {status === "error" && (
            <div className="text-sm text-error" role="alert">
              <p className="flex items-center gap-2 font-medium">
                <Icon icon="solar:danger-triangle-bold" />
                Não conseguimos salvar seus dados agora.
              </p>
              <a href={waUrl} className="mt-1 inline-block font-semibold text-whatsapp underline">
                Seguir para o WhatsApp mesmo assim
              </a>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
