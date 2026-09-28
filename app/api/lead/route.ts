import { NextResponse } from "next/server";
import { validateLead, validateQuickLead, type Lead } from "@/lib/lead";

const str = (v: unknown, max: number) => String(v ?? "").slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  // Honeypot preenchido = bot. Responde ok para não dar pista.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  // Botão de WhatsApp: só nome e número, para o time chamar.
  if (body.tipo === "whatsapp") {
    const quick = { nome: str(body.nome, 120), whatsapp: str(body.whatsapp, 20) };
    const errors = validateQuickLead(quick);
    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, errors }, { status: 422 });
    }
    return deliver({ ...quick, tipo: "whatsapp" });
  }

  const lead: Lead = {
    nome: str(body.nome, 120),
    whatsapp: str(body.whatsapp, 20),
    cidade: str(body.cidade, 120),
    tipoArea: str(body.tipoArea, 40),
    metragem: str(body.metragem, 60),
    entrega: str(body.entrega, 20),
    oQueCercar: str(body.oQueCercar, 300),
    prazo: str(body.prazo, 40),
    mensagem: str(body.mensagem, 1000),
  };

  const errors = validateLead(lead);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  return deliver({ ...lead, tipo: "formulario" });
}

async function deliver(data: Record<string, unknown>) {
  const payload = { ...data, origem: "lp-telas-sinop", recebidoEm: new Date().toISOString() };
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (err) {
      console.error("[lead] falha ao enviar para o webhook", err);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } else {
    console.info("[lead] LEAD_WEBHOOK_URL não configurada. Lead recebido:", payload);
  }

  return NextResponse.json({ ok: true });
}
