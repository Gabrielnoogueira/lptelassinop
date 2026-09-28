export const site = {
  name: "Telas Sinop",
  phoneDisplay: "(66) 99613-9218",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5566996139218",
  tagline: "Soluções em cercamentos",
  city: "Sinop / MT",
};

export function whatsappLink(message = "Olá! Vim pelo site e quero um orçamento.") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
