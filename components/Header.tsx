"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#produtos", label: "Produtos" },
  { href: "#orcamento", label: "Orçamento" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* barra de topo */}
      <div
        className={`bg-steel text-text-on-steel transition-[margin] duration-500 ${scrolled ? "-mt-9" : "mt-0"}`}
        aria-label="Contato"
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-3 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] sm:justify-between sm:px-6">
          <span className="hidden sm:inline">
            {site.tagline} <span className="text-accent">·</span> {site.city}
          </span>
          <span className="tabular flex items-center gap-2">
            <Icon icon="solar:phone-calling-bold-duotone" className="text-sm text-accent" />
            {site.phoneDisplay}
          </span>
        </div>
      </div>

      <div
        className={`border-b border-neutral-100 bg-white/85 backdrop-blur-md transition-shadow duration-500 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex shrink-0 items-center" aria-label="Telas Sinop, início">
            <Image src="/logo-telassinop.png" alt="Telas Sinop" width={327} height={95} className="h-8 w-auto" priority />
          </a>
          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-500 lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-accent">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#orcamento" className="btn btn-primary !px-4 !py-2 text-[11px] uppercase tracking-[0.08em] sm:!px-5">
            Pedir orçamento
          </a>
        </div>
      </div>
    </header>
  );
}
