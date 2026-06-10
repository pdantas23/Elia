import { Mail, Phone } from "lucide-react";
import Link from "next/link";

import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_E164,
  INSTAGRAM_URL,
  PINTEREST_URL,
  STUDIO_CITY,
  STUDIO_SCHEDULING_NOTE,
} from "@/lib/constants";

const EMAIL = CONTACT_EMAIL;

// Editorial design tokens hardcoded so the footer works inside any wrapper,
// not depending on parent CSS vars.
const INK = "#2A2622";
const INK_SOFT = "#6B6660";
const INK_QUIET = "#948E88";
const LINE = "rgba(42, 38, 34, 0.10)";
const BG = "#F4F0EB";

const MONO = "font-[var(--font-jetbrains-mono)]";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#FCAF45" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#833AB4" />
          <stop offset="100%" stopColor="#5851DB" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="url(#ig-grad)"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="url(#ig-grad)"
        strokeWidth="1.8"
      />
      <circle cx="17.2" cy="6.8" r="1.1" fill="url(#ig-grad)" />
    </svg>
  );
}

function PinterestIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.97 2 4 5.36 4 9.18c0 1.78 1 4 2.6 4.7.24.1.37.06.42-.18.04-.18.26-1.06.36-1.46a.39.39 0 0 0-.09-.37c-.55-.66-.99-1.87-.99-3 0-2.9 2.2-5.71 5.93-5.71 3.23 0 5.49 2.2 5.49 5.35 0 3.55-1.79 6.01-4.12 6.01-1.29 0-2.25-1.06-1.94-2.37.37-1.56 1.08-3.24 1.08-4.37 0-1.01-.54-1.85-1.66-1.85-1.32 0-2.38 1.36-2.38 3.19 0 1.16.39 1.95.39 1.95s-1.34 5.66-1.57 6.66c-.27 1.16-.16 2.79-.05 3.85a.18.18 0 0 0 .32.08c.16-.22 1.5-2.22 1.97-4.26.13-.55.74-2.82.74-2.82.39.74 1.52 1.36 2.72 1.36 3.58 0 6.02-3.26 6.02-7.63C20 5.13 16.86 2 12.04 2Z" />
    </svg>
  );
}

const colLabel = `${MONO} text-[11px] tracking-[0.16em] uppercase mb-2`;
const linkBase = "text-[14px] transition-colors";

export function EditorialFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="pt-[clamp(48px,6vw,72px)] pb-[clamp(28px,4vw,40px)] border-t"
      style={{ borderColor: LINE, background: BG, color: INK }}
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,56px)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[clamp(28px,4vw,48px)] text-center">
          {/* Trabalho */}
          <div className="flex flex-col items-center gap-2.5">
            <div className={colLabel} style={{ color: INK_SOFT }}>
              Trabalho
            </div>
            <Link
              href="/corporativo"
              className={linkBase}
              style={{ color: INK_SOFT }}
            >
              Identidade corporativa
            </Link>
            <Link
              href="/eventos"
              className={linkBase}
              style={{ color: INK_SOFT }}
            >
              Identidade para eventos
            </Link>
            <Link
              href="/#portfolio"
              className={linkBase}
              style={{ color: INK_SOFT }}
            >
              Portfólio
            </Link>
            <Link
              href="/#orcamento"
              className={linkBase}
              style={{ color: INK_SOFT }}
            >
              Solicitar orçamento
            </Link>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-center gap-2.5">
            <div className={colLabel} style={{ color: INK_SOFT }}>
              Contato
            </div>
            <a
              href={`https://wa.me/${CONTACT_PHONE_E164}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} inline-flex items-center gap-2`}
              style={{ color: INK_SOFT }}
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{CONTACT_PHONE}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className={`${linkBase} inline-flex items-center gap-2 break-all`}
              style={{ color: INK_SOFT }}
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{EMAIL}</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} inline-flex items-center gap-2 hover:opacity-80`}
              style={{ color: "#E1306C" }}
            >
              <InstagramIcon className="w-4 h-4 shrink-0" />
              <span>Instagram</span>
            </a>
            <a
              href={PINTEREST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} inline-flex items-center gap-2 hover:opacity-80`}
              style={{ color: "#BD081C" }}
            >
              <PinterestIcon className="w-4 h-4 shrink-0" />
              <span>Pinterest</span>
            </a>
          </div>

          {/* Estúdio */}
          <div className="flex flex-col items-center gap-2.5">
            <div className={colLabel} style={{ color: INK_SOFT }}>
              Estúdio
            </div>
            <span className="text-[14px]" style={{ color: INK_SOFT }}>
              {STUDIO_CITY}
            </span>
            <span className="text-[14px]" style={{ color: INK_SOFT }}>
              {STUDIO_SCHEDULING_NOTE}
            </span>
          </div>
        </div>

        <div
          className={`${MONO} flex justify-center mt-[clamp(40px,5vw,56px)] pt-6 border-t text-[10.5px] tracking-[0.18em] uppercase`}
          style={{ color: INK_QUIET, borderColor: LINE }}
        >
          <span suppressHydrationWarning>
            © {year} · Eliá Identidade Visual
          </span>
        </div>
      </div>
    </footer>
  );
}
