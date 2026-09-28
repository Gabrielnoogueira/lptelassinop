export type Lead = {
  nome: string;
  whatsapp: string;
  cidade: string;
  tipoArea: string;
  metragem: string;
  entrega: string;
  oQueCercar: string;
  prazo: string;
  mensagem: string;
};

export type LeadErrors = Partial<Record<keyof Lead, string>>;

export const emptyLead: Lead = {
  nome: "",
  whatsapp: "",
  cidade: "",
  tipoArea: "",
  metragem: "",
  entrega: "",
  oQueCercar: "",
  prazo: "",
  mensagem: "",
};

export function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

/** (66) 99999-9999 */
export function maskPhone(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function validateLead(l: Lead): LeadErrors {
  const e: LeadErrors = {};
  if (l.nome.trim().length < 2) e.nome = "Diga como podemos te chamar.";
  const phone = onlyDigits(l.whatsapp);
  if (phone.length < 10 || phone.length > 11) e.whatsapp = "Informe um WhatsApp com DDD.";
  if (l.cidade.trim().length < 2) e.cidade = "Informe a cidade.";
  if (!l.tipoArea) e.tipoArea = "Escolha o tipo de área.";
  if (l.mensagem.length > 1000) e.mensagem = "Máximo de 1000 caracteres.";
  return e;
}

/** Lead rápido do botão de WhatsApp: só nome e número, antes do redirect. */
export type QuickLead = Pick<Lead, "nome" | "whatsapp">;

export function validateQuickLead(l: QuickLead): LeadErrors {
  const { nome, whatsapp } = validateLead({ ...emptyLead, ...l });
  const e: LeadErrors = {};
  if (nome) e.nome = nome;
  if (whatsapp) e.whatsapp = whatsapp;
  return e;
}
