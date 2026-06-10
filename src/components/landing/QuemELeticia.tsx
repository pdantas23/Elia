import { Section } from "./Section";
import { InlineCTA } from "./InlineCTA";

interface QuemELeticiaProps {
  page: string;
}

export function QuemELeticia({ page }: QuemELeticiaProps) {
  return (
    <Section id="sobre">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          {/* Placeholder — foto opcional */}
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Foto (opcional)
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-light tracking-tight md:text-4xl">
            Quem está por trás
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Letícia Aguiar trabalha com identidade visual há anos, com foco em
              execução real. Cada projeto entregue passa por suas mãos, do
              conceito à produção física.
            </p>
            <p>
              Domina processos de impressão, escolha de materiais e acabamentos.
              Não entrega apenas um arquivo digital: entrega a marca aplicada,
              pronta para funcionar no mundo real.
            </p>
            <p>
              Atendimento próximo, resposta rápida e comprometimento com o
              resultado final. Cada cliente recebe atenção integral, do primeiro
              contato à entrega.
            </p>
          </div>
          <InlineCTA page={page} section="sobre" />
        </div>
      </div>
    </Section>
  );
}
