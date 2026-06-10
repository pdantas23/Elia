import Image from "next/image";

import {
  FONT_DISPLAY,
  FONT_MONO,
} from "@/components/landing/editorial-tokens";

const RATIO_CLASS = {
  "r-45": "aspect-[4/5]",
  "r-32": "aspect-[3/2]",
  "r-23": "aspect-[2/3]",
  "r-11": "aspect-square",
  "r-54": "aspect-[5/4]",
  "r-43": "aspect-[4/3]",
  "r-34": "aspect-[3/4]",
} as const;

export type PhotoRatio = keyof typeof RATIO_CLASS;

type PhotoPlaceholderProps = {
  /** If omitted, the placeholder fills its parent (h-full). */
  ratio?: PhotoRatio;
  project: string;
  type: string;
  /** Real image source (already resolved via assetPath). When set, renders the photo. */
  src?: string;
  /** Accessible description for the photo. Falls back to `${project}, ${type}`. */
  alt?: string;
  /** Hint next/image to prioritize above-the-fold tiles. */
  priority?: boolean;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
};

export function PhotoPlaceholder({
  ratio,
  project,
  type,
  src,
  alt,
  priority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 40vw",
}: PhotoPlaceholderProps) {
  const sizeClass = ratio ? RATIO_CLASS[ratio] : "h-full";

  // ─── Real photo ───
  if (src) {
    return (
      <div
        className={`relative isolate overflow-hidden rounded-[2px] bg-[var(--surface)] border border-[var(--line)] ${sizeClass}`}
      >
        <Image
          src={src}
          alt={alt ?? (type ? `${project}, ${type}` : project)}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start gap-[4px] p-[clamp(16px,2.4vw,22px)] bg-gradient-to-t from-black/60 via-black/25 to-transparent">
          <div
            className={`${FONT_DISPLAY} italic font-medium text-[clamp(16px,1.6vw,19px)] leading-[1.2] text-white max-w-[28ch]`}
          >
            {project}
          </div>
          {type ? (
            <div
              className={`${FONT_MONO} text-[10px] tracking-[0.16em] uppercase text-white/80`}
            >
              {type}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // ─── Placeholder (no photo yet) ───
  return (
    <div
      className={`relative isolate overflow-hidden rounded-[2px] bg-[var(--surface)] border border-[var(--line)] transition-transform duration-[360ms] ${sizeClass}`}
      role="img"
      aria-label={`Foto real a ser inserida: ${project}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(42,38,34,0.022) 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-start justify-end gap-[6px] p-[clamp(16px,2.4vw,22px)] text-[var(--ink-soft)]">
        <div
          className={`${FONT_MONO} text-[10px] uppercase tracking-[0.18em] text-[var(--ink-quiet)] flex items-center gap-2 before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[var(--brand-soft)]`}
        >
          Foto real a ser inserida
        </div>
        <div
          className={`${FONT_DISPLAY} italic font-medium text-[clamp(16px,1.6vw,19px)] leading-[1.2] text-[var(--ink)] max-w-[28ch]`}
        >
          {project}
          <small
            className={`${FONT_MONO} block mt-1 not-italic text-[10px] tracking-[0.16em] uppercase text-[var(--ink-quiet)]`}
          >
            {type}
          </small>
        </div>
      </div>
    </div>
  );
}
