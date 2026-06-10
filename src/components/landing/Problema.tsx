import { Section } from "./Section";
import { InlineCTA } from "./InlineCTA";

interface ProblemaProps {
  items: { title: string; description: string }[];
  page: string;
}

export function Problema({ items, page }: ProblemaProps) {
  return (
    <Section id="problema">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-light tracking-tight md:text-4xl">
          Você reconhece alguma dessas situações?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="space-y-3 text-left">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <InlineCTA page={page} section="problema" />
      </div>
    </Section>
  );
}
