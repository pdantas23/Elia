import { Section } from "./Section";
import { InlineCTA } from "./InlineCTA";

const STEPS = [
  {
    number: "01",
    title: "Briefing",
    description:
      "Entendemos o projeto, o público e o contexto antes de criar qualquer coisa.",
  },
  {
    number: "02",
    title: "Conceito",
    description:
      "Desenvolvimento da identidade com base em pesquisa e estratégia visual.",
  },
  {
    number: "03",
    title: "Aplicação",
    description:
      "Definição de como a marca será aplicada em cada material e ponto de contato.",
  },
  {
    number: "04",
    title: "Execução",
    description:
      "Produção com domínio técnico: materiais, acabamentos e viabilidade real.",
  },
  {
    number: "05",
    title: "Entrega",
    description:
      "Material final em mãos, pronto para uso. O momento que emociona.",
  },
];

interface ProcessoProps {
  page: string;
}

export function Processo({ page }: ProcessoProps) {
  return (
    <Section id="processo" className="bg-white">
      <div className="text-center">
        <h2 className="font-display text-3xl font-light tracking-tight md:text-4xl">
          Como funciona
        </h2>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-5">
        {STEPS.map((step) => (
          <div key={step.number} className="space-y-3">
            <span className="font-display text-3xl font-light text-muted-foreground">
              {step.number}
            </span>
            <h3 className="text-lg font-medium">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
      <InlineCTA page={page} section="processo" />
    </Section>
  );
}
