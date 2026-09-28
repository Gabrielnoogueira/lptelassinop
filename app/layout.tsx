import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://telassinop.com.br"),
  title: "Telas Sinop | Telas e cercamentos direto da fábrica em Sinop e região",
  description:
    "Compre com quem fabrica: telas soldadas, hexagonais, arames, gradis e alambrados com atendimento consultivo. Há 12 anos em Sinop e região. Orçamento pelo WhatsApp.",
  openGraph: {
    title: "Telas Sinop | Direto da fábrica em Sinop / MT",
    description: "Fabricação própria, melhor custo-benefício e orientação para escolher o cercamento certo.",
    images: ["/hero-alambrado.webp"],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
