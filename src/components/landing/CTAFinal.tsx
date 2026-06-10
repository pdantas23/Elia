import { Section } from "./Section";
import { LeadForm } from "./LeadForm";
import { WhatsAppButton } from "./WhatsAppButton";

interface CTAFinalProps {
  origemPagina: "/" | "/corporativo" | "/eventos" | "/bio";
}

export function CTAFinal({ origemPagina }: CTAFinalProps) {
  return (
    <Section id="contato">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-light tracking-tight md:text-4xl">
            Conte sobre o projeto
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A conversa comeca pelo entendimento. Preencha o formulário ou fale
            diretamente no WhatsApp.
          </p>
          <WhatsAppButton
            variant="inline"
            page={origemPagina}
            section="final"
          />
        </div>
        <LeadForm origemPagina={origemPagina} origemSecao="final" />
      </div>
    </Section>
  );
}
