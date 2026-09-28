import Image from "next/image";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import FlashlightCard from "@/components/FlashlightCard";
import LeadForm from "@/components/LeadForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  areas,
  authoritySeals,
  comparison,
  doubts,
  factoryReasons,
  heroSeals,
  productList,
} from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* ================= HERO ================= */}
        <section id="top" className="bg-mesh relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-48">
          <div className="aurora-blob -right-40 -top-60 h-[600px] w-[600px] animate-aurora bg-accent/10" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="hero-in mb-7 inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-4 py-2">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-600">
                  Direto da fábrica · Sinop / MT
                </span>
              </div>

              <h1 className="mb-7 max-w-[14ch]">
                <span className="hero-in block" style={{ animationDelay: "0.1s" }}>
                  Telas e cercamentos
                </span>
                <span className="hero-in block text-accent" style={{ animationDelay: "0.2s" }}>
                  direto da fábrica
                </span>
                <span className="hero-in block" style={{ animationDelay: "0.3s" }}>
                  em Sinop e região
                </span>
              </h1>

              <p className="lede hero-in mb-8" style={{ animationDelay: "0.4s" }}>
                Compre com quem fabrica e conte com orientação para escolher a solução certa para sua{" "}
                <strong className="font-semibold text-ink">chácara, área rural, terreno, obra ou residência.</strong>
              </p>

              <ul className="hero-in mb-10 flex max-w-2xl flex-wrap gap-2" style={{ animationDelay: "0.5s" }}>
                {heroSeals.map((s) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-100 bg-white/80 px-3 py-1.5 text-[13px] font-semibold text-neutral-700"
                  >
                    <Icon icon="solar:check-circle-bold" className="text-accent" />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="hero-in flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.6s" }}>
                <Cta>Pedir orçamento</Cta>
                <a href="#solucoes" className="btn btn-outline uppercase tracking-[0.06em]">
                  <span>Ver soluções para minha área</span>
                  <div className="fill" />
                </a>
              </div>
              <p className="micro hero-in mt-5" style={{ animationDelay: "0.7s" }}>
                Compre direto de quem fabrica · Atendimento em Sinop e região
              </p>
            </div>

            <Reveal variant="zoom" className="relative lg:col-span-5">
              <div className="hero-photo-card aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/hero-alambrado.webp"
                  alt="Alambrado de tela soldada instalado"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="glass-panel-light absolute -bottom-8 left-4 flex items-center gap-4 rounded-lg px-5 py-4 shadow-xl sm:-left-8">
                <span className="numeral numeral-solid text-[4.5rem]">12</span>
                <span className="max-w-[9ch] text-[11px] font-bold uppercase leading-[1.35] tracking-[0.16em] text-neutral-600">
                  anos cercando a região
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= POR QUE DIRETO DA FÁBRICA ================= */}
        <section className="bg-surface py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <span className="eyebrow">Direto da fábrica</span>
              <h2 className="mt-5">
                Por que comprar <span className="mark">direto de quem fabrica?</span>
              </h2>
              <p className="lede mt-6">
                Na hora de cercar uma área, preço importa. Mas comprar certo também importa. Quando você compra com quem
                fabrica, fica mais fácil encontrar uma solução com bom custo-benefício, resistência adequada e orientação
                para não escolher o produto errado.
              </p>
              <Cta href="#orcamento" micro="Menos intermediários · Preço competitivo" className="mt-9">
                Quero comprar direto da fábrica
              </Cta>
            </Reveal>

            <ol className="lg:col-span-7">
              {factoryReasons.map((r, i) => (
                <Reveal as="li" key={r.title} delay={0.08 * i}>
                  <div className="grid grid-cols-[auto_1fr] items-start gap-6 border-t border-neutral-100 py-9 sm:gap-10">
                    <span className="numeral text-6xl sm:text-7xl">{String(i + 1).padStart(2, "0")}</span>
                    <div className="pt-1">
                      <h3 className="mb-2 text-ink">{r.title}</h3>
                      <p className="text-neutral-600">{r.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= DORES / DÚVIDAS ================= */}
        <section className="bg-mesh relative overflow-hidden bg-bg py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="mx-auto mb-14 max-w-3xl text-center">
              <h2>
                Cercar sua área <span className="text-accent">não precisa</span> ser complicado
              </h2>
              <p className="lede mx-auto mt-6">
                Muita gente chega até a Telas Sinop sem saber exatamente qual tela, arame ou cercamento comprar. A dúvida é
                comum: cada tipo de área exige uma solução diferente.
              </p>
            </Reveal>

            <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {doubts.map((d, i) => (
                <Reveal as="li" key={d} delay={0.06 * i} className={i === doubts.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}>
                  <p className="q-quote h-full rounded-card border border-neutral-100 bg-surface p-6 pl-12 text-[17px] font-semibold leading-snug text-ink">
                    {d}
                  </p>
                </Reveal>
              ))}
              <Reveal as="li" delay={0.3} className="sm:col-span-2 lg:col-span-3">
                <div className="flex flex-col items-start justify-between gap-6 rounded-card bg-steel p-7 text-text-on-steel sm:p-9 md:flex-row md:items-center">
                  <p className="max-w-xl text-lg">
                    Na Telas Sinop, você fala com <strong className="text-white">quem entende do produto</strong> e recebe
                    orientação antes de comprar.
                  </p>
                  <Cta micro="Solução certa para sua área" microSteel className="shrink-0">
                    Falar com um especialista
                  </Cta>
                </div>
              </Reveal>
            </ul>
          </div>
        </section>

        {/* ================= SOLUÇÕES POR ÁREA ================= */}
        <section id="solucoes" className="scroll-mt-24 bg-surface py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
              <h2>
                Soluções para cada <span className="mark">tipo de área</span>
              </h2>
              <p className="lede">
                Escolha pelo que você precisa cercar. A Telas Sinop ajuda a indicar o produto mais adequado para cada uso.
              </p>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-6">
              {areas.map((a, i) => (
                <Reveal key={a.title} delay={0.06 * i} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
                  <FlashlightCard className="group flex h-full flex-col gap-10 rounded-card border border-neutral-100 bg-bg p-7 transition-colors hover:border-accent/40">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-card bg-accent/10 text-accent">
                        <Icon icon={a.icon} className="text-2xl" />
                      </span>
                      <span className="tabular text-xs font-bold tracking-[0.2em] text-neutral-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <h3 className="mb-2 text-ink">{a.title}</h3>
                      <p className="text-[15px] text-neutral-600">{a.text}</p>
                    </div>
                  </FlashlightCard>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex justify-center">
              <Cta href="#orcamento" micro="Orçamento com orientação especializada" center>
                Encontrar a solução ideal
              </Cta>
            </Reveal>
          </div>
        </section>

        {/* ================= PRODUTOS ================= */}
        <section id="produtos" className="scroll-mt-24 bg-bg py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="mb-14 max-w-3xl">
              <span className="eyebrow">Fabricação própria</span>
              <h2 className="mt-5">Produtos fabricados para quem precisa cercar com segurança</h2>
              <p className="lede mt-6">
                Telas, arames e cercamentos para diferentes aplicações, com atendimento direto de quem entende e fabrica.
              </p>
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-3">
              <Reveal className="lg:row-span-2">
                <div className="media-card h-full min-h-[380px]">
                  <div className="bg">
                    <Image src="/hero-alambrado.webp" alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="scrim" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-7">
                    <span className="badge badge-primary mb-4 w-fit">Fabricação própria</span>
                    <p className="font-display text-3xl uppercase leading-[0.95] text-white">
                      Telas, arames e cercamentos feitos por nós.
                    </p>
                  </div>
                </div>
              </Reveal>

              <ul className="grid gap-px overflow-hidden rounded-card border border-neutral-100 bg-neutral-100 sm:grid-cols-2 lg:col-span-2">
                {productList.map((p, i) => (
                  <Reveal as="li" key={p.name} delay={0.05 * i} className="bg-surface">
                    <div className="flex h-full gap-5 p-7">
                      <span className="tabular pt-1 text-xs font-bold tracking-[0.2em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="mb-1.5 text-ink">{p.name}</h3>
                        <p className="text-[15px] text-neutral-600">{p.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal className="mt-12 flex justify-center">
              <Cta micro="Compre direto de quem fabrica" center>
                Tirar dúvida sobre o produto
              </Cta>
            </Reveal>
          </div>
        </section>

        {/* ================= AUTORIDADE ================= */}
        <section className="bg-mesh-on-steel relative overflow-hidden bg-steel py-24 text-text-on-steel md:py-32">
          <div className="aurora-blob -left-40 top-0 h-[480px] w-[480px] animate-aurora bg-accent/20" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12">
            <Reveal variant="zoom" className="lg:col-span-5">
              <div className="flex items-end gap-4">
                <span className="numeral numeral-steel text-[11rem] sm:text-[15rem]">12</span>
                <span className="mb-6 text-sm font-bold uppercase leading-snug tracking-[0.2em] text-neutral-300">
                  anos
                  <br />
                  de atuação
                </span>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7">
              <h2 className="text-white">
                Há 12 anos cercando <span className="mark mark-steel">Sinop e região</span>
              </h2>
              <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-neutral-300">
                A Telas Sinop construiu sua presença regional atendendo clientes que precisam de telas, arames, gradis,
                alambrados e soluções de cercamento para campo, cidade, obras e propriedades. A experiência no segmento
                permite orientar melhor cada cliente, considerando uso, aplicação, resistência e custo-benefício.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-16 border-y border-white/10 py-5" aria-label="Selos">
            <div className="marquee-container">
              {[0, 1].map((k) => (
                <div
                  key={k}
                  aria-hidden={k === 1}
                  className="marquee-content text-sm font-bold uppercase tracking-[0.18em] text-neutral-300"
                >
                  {authoritySeals.map((s) => (
                    <span key={s} className="flex items-center gap-12 whitespace-nowrap">
                      {s}
                      <span className="text-accent">◆</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COMPARATIVO ================= */}
        <section className="bg-surface py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="mx-auto mb-14 max-w-3xl text-center">
              <h2>
                Preço bom não é só pagar menos. <span className="text-accent">É comprar certo.</span>
              </h2>
              <p className="lede mx-auto mt-6">
                Em cercamentos, o barato pode sair caro quando o produto não é adequado para o uso. A Telas Sinop une
                fabricação própria, preço competitivo e orientação consultiva para ajudar você a comprar uma solução que
                faça sentido para sua área.
              </p>
            </Reveal>

            <Reveal className="grid overflow-hidden rounded-lg border border-neutral-100 md:grid-cols-2">
              <div className="bg-bg p-7 sm:p-10">
                <h3 className="mb-6 text-neutral-500">Comprar só pelo menor preço</h3>
                <ul className="space-y-4">
                  {comparison.map(([bad]) => (
                    <li key={bad} className="flex items-start gap-3 text-neutral-500">
                      <Icon icon="solar:close-circle-linear" className="mt-0.5 shrink-0 text-xl text-neutral-300" />
                      <span className="line-through decoration-neutral-300 decoration-1">{bad}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative bg-steel p-7 text-text-on-steel sm:p-10">
                <span className="badge badge-primary absolute right-6 top-6">Recomendado</span>
                <h3 className="mb-6 text-white">Comprar com a Telas Sinop</h3>
                <ul className="space-y-4">
                  {comparison.map(([, good]) => (
                    <li key={good} className="flex items-start gap-3 font-medium">
                      <Icon icon="solar:check-circle-bold" className="mt-0.5 shrink-0 text-xl text-accent" />
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="mt-12 flex justify-center">
              <Cta href="#orcamento" micro="Melhor custo-benefício para cercar com segurança" center>
                Quero um orçamento com bom custo-benefício
              </Cta>
            </Reveal>
          </div>
        </section>

        {/* ================= FORMULÁRIO ================= */}
        <section id="orcamento" className="bg-mesh relative scroll-mt-24 overflow-hidden bg-bg py-24 md:py-32">
          <div className="aurora-blob -right-40 bottom-0 h-[520px] w-[520px] animate-aurora bg-accent/10" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <span className="eyebrow">Orçamento</span>
              <h2 className="mt-5">Solicite seu orçamento</h2>
              <p className="lede mt-6">
                Preencha as informações abaixo para a equipe entender sua necessidade e preparar um atendimento mais
                assertivo.
              </p>
            </Reveal>

            <Reveal variant="zoom" className="lg:col-span-7">
              <div className="glass-panel-light rounded-lg p-6 shadow-[0_24px_60px_-24px_rgba(11,18,26,0.25)] sm:p-10">
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="bg-mesh-on-steel relative overflow-hidden bg-steel py-24 text-center md:py-32">
          <div className="aurora-blob left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 bg-accent/20" />
          <Reveal className="relative mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-white">
              Vai cercar sua área? <span className="mark mark-steel">Compre direto de quem fabrica.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[58ch] text-lg text-neutral-300">
              Fale com a Telas Sinop e receba orientação para escolher uma solução com bom custo-benefício para sua
              chácara, área rural, obra, terreno ou residência.
            </p>
            <div className="mt-10 flex justify-center">
              <Cta micro="Atendimento para Sinop e região" center microSteel>
                Pedir orçamento
              </Cta>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ================= RODAPÉ ================= */}
      <footer className="bg-ink py-12 text-neutral-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 md:flex-row md:text-left">
          <div>
            <span className="font-display text-sm text-white">TELAS SINOP</span>
            <p className="micro mt-2 !text-neutral-400">
              {site.tagline} · {site.city} · <span className="tabular">{site.phoneDisplay}</span>
            </p>
          </div>
          <p className="text-xs">© 2026 Telas Sinop. Telas, arames, gradis e alambrados.</p>
        </div>
      </footer>

      {/* Único caminho para o WhatsApp: captura nome e número antes do redirect */}
      <WhatsAppButton />
    </>
  );
}

type CtaProps = {
  children: ReactNode;
  micro?: string;
  className?: string;
  center?: boolean;
};

/** CTA primário (azul) que leva ao formulário de orçamento, com microcopy opcional. */
function Cta({
  href = "#orcamento",
  children,
  micro,
  className = "",
  center,
  microSteel,
}: CtaProps & { href?: string; microSteel?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 ${center ? "items-center text-center" : "items-start"} ${className}`}>
      <a href={href} className="btn btn-primary uppercase tracking-[0.06em]">
        {children}
        <Icon icon="solar:arrow-right-linear" className="text-lg" />
      </a>
      {micro && <p className={`micro ${microSteel ? "!text-neutral-300" : ""}`}>{micro}</p>}
    </div>
  );
}
