"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { FONT_MONO } from "@/components/landing/editorial-tokens";
import { assetPath } from "@/lib/utils";

type NavSection = { label: string; href: string };

type TopbarProps = {
  /** Where the logo links to. Defaults to `/links`. */
  homeHref?: string;
  /** Section links shown on the right (desktop) and inside the menu (mobile). */
  sections?: NavSection[];
};

export function Topbar({ homeHref = "/links", sections = [] }: TopbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 8;
      setScrolled(s);
      if (!s) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao passar para o breakpoint desktop.
  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const hasNav = sections.length > 0;

  const linkCls = `${FONT_MONO} text-[12px] uppercase tracking-[0.16em] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]`;

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-50 bg-[rgba(244,240,235,0.78)] [backdrop-filter:blur(14px)_saturate(160%)] [-webkit-backdrop-filter:blur(14px)_saturate(160%)] border-b border-transparent data-[scrolled]:border-[rgba(42,38,34,0.10)] transition-[border-color,background-color] duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-[clamp(20px,5vw,56px)] py-[clamp(12px,1.6vw,18px)]">
        {/* Linha do logo (centralizado). Hambúrguer fica à extrema direita no mobile. */}
        <div className="relative flex items-center justify-center">
          <Link
            href={homeHref}
            aria-label="Eliá, voltar à página inicial"
            className="inline-flex"
          >
            <Image
              src={assetPath("/images/brand/elia-logotipo.png")}
              alt="Eliá"
              width={1261}
              height={531}
              className="h-[54px] w-auto sm:h-[64px] md:h-[76px]"
              priority
            />
          </Link>

          {hasNav && (
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`md:hidden absolute right-0 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-[5px] border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] transition-[opacity,border-color] duration-300 hover:border-[var(--ink)] cursor-pointer ${
                scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {open ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
            </button>
          )}
        </div>

        {/* Desktop: seções centralizadas abaixo do logo. Aparecem só após o scroll. */}
        {hasNav && (
          <div
            className={`hidden md:block overflow-hidden transition-[max-height,opacity,margin-top] duration-300 ease-out ${
              scrolled
                ? "max-h-[64px] opacity-100 mt-[clamp(10px,1.4vw,16px)]"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <nav className="flex justify-center items-center gap-[clamp(20px,2.6vw,40px)]">
              {sections.map((s) => (
                <a key={s.href} href={s.href} className={linkCls}>
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Mobile: painel do menu */}
      {hasNav && scrolled && open && (
        <nav className="md:hidden border-t border-[rgba(42,38,34,0.10)] bg-[rgba(244,240,235,0.96)]">
          <div className="flex flex-col max-w-[1200px] mx-auto px-[clamp(20px,5vw,56px)] py-1">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className={`${FONT_MONO} text-[13px] uppercase tracking-[0.16em] text-[var(--ink)] py-[14px] border-b border-[var(--line)] last:border-b-0`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
