import { Section } from "./Section";
import { WhatsAppButton } from "./WhatsAppButton";
import { TrackedLink } from "./TrackedLink";

interface HeroProps {
  headline: string;
  subheadline: string;
  page: "/" | "/corporativo" | "/eventos";
}

export function Hero({ headline, subheadline, page }: HeroProps) {
  return (
    <Section className="py-20 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h1 className="font-display text-4xl font-light leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            {subheadline}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton variant="hero" page={page} section="hero" />
            <TrackedLink
              href="#contato"
              trackingEvent={{
                name: "cta_click",
                page,
                section: "hero",
                button_label: "Solicitar Orçamento",
                destination: "form",
              }}
              className="inline-flex items-center justify-center rounded-md border border-foreground px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Solicitar Orçamento
            </TrackedLink>
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
          {/* Placeholder para imagem real de portfolio */}
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Foto de aplicação real
          </div>
        </div>
      </div>
    </Section>
  );
}
