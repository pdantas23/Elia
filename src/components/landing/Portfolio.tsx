"use client";

import { Section } from "./Section";
import { InlineCTA } from "./InlineCTA";
import { trackEvent } from "@/lib/tracking";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
}

interface PortfolioProps {
  items: PortfolioItem[];
  page: string;
}

export function Portfolio({ items, page }: PortfolioProps) {
  return (
    <Section id="portfolio">
      <div className="text-center">
        <h2 className="font-display text-3xl font-light tracking-tight md:text-4xl">
          Projetos executados
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Trabalhos reais. Aplicação física. Resultado concreto.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              trackEvent({
                name: "portfolio_item_click",
                page,
                item_id: item.id,
              })
            }
            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted text-left transition-transform hover:scale-[1.02]"
          >
            {/* Placeholder para foto real */}
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Foto real
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
              <p className="text-sm text-white/70">{item.category}</p>
              <p className="text-lg font-medium text-white">{item.title}</p>
            </div>
          </button>
        ))}
      </div>
      <InlineCTA page={page} section="portfolio" />
    </Section>
  );
}
