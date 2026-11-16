/**
 * Integração com o sistema de tracking da Telas Sinop (Meta Pixel + CAPI,
 * painel de leads). O snippet é carregado no app/layout.tsx e expõe
 * window.trackLead. PageView, Scroll e FormStart são automáticos; o Lead é
 * enviado daqui, só depois da validação do formulário, porque os forms usam
 * noValidate e estão marcados com data-trck-manual.
 */
export const TRACKER_SRC = "https://tracking.telassinop.com.br/api/tracker";

type TrackLeadData = {
  name?: string;
  phone?: string;
  email?: string;
  /** Demais campos do form, como aparecem no painel e no CRM. */
  extra?: Record<string, string>;
};

declare global {
  interface Window {
    trackLead?: (data: TrackLeadData) => Promise<unknown>;
  }
}

/** Nunca lança nem bloqueia o fluxo da LP: se o snippet não carregou, segue sem tracking. */
export function trackLead(data: TrackLeadData) {
  try {
    const extra = Object.fromEntries(Object.entries(data.extra ?? {}).filter(([, v]) => v.trim()));
    void window.trackLead?.({ ...data, extra: Object.keys(extra).length ? extra : undefined });
  } catch {
    // tracking é secundário ao envio do lead
  }
}
