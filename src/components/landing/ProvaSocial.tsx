import { Section } from "./Section";
import { InlineCTA } from "./InlineCTA";

interface Depoimento {
  nome: string;
  texto: string;
  projeto?: string;
}

interface ProvaSocialProps {
  depoimentos: Depoimento[];
  page: string;
}

export function ProvaSocial({ depoimentos, page }: ProvaSocialProps) {
  return (
    <Section id="depoimentos" className="bg-white">
      <div className="text-center">
        <h2 className="font-display text-3xl font-light tracking-tight md:text-4xl">
          O que dizem sobre o trabalho
        </h2>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {depoimentos.map((dep) => (
          <blockquote
            key={dep.nome}
            className="space-y-4 rounded-lg border border-muted p-6"
          >
            <p className="text-muted-foreground leading-relaxed italic">
              &ldquo;{dep.texto}&rdquo;
            </p>
            <footer>
              <p className="font-medium">{dep.nome}</p>
              {dep.projeto && (
                <p className="text-sm text-muted-foreground">{dep.projeto}</p>
              )}
            </footer>
          </blockquote>
        ))}
      </div>
      <InlineCTA page={page} section="depoimentos" />
    </Section>
  );
}
