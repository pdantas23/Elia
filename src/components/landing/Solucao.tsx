import { Section } from "./Section";
import { InlineCTA } from "./InlineCTA";

interface SolucaoProps {
  items: { title: string; description: string }[];
  page: string;
}

export function Solucao({ items, page }: SolucaoProps) {
  return (
    <Section id="solucao" className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-light tracking-tight md:text-4xl">
          Identidade visual que sai do papel
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Do conceito à execução real. Cada projeto entregue chega à fachada, ao
          convite, ao material.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="space-y-3">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <InlineCTA page={page} section="solucao" />
    </Section>
  );
}
