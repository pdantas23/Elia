interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
}

function KPICard({ title, value, description }: KPICardProps) {
  return (
    <div className="rounded-lg border border-muted bg-white p-5">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-1 text-3xl font-light tracking-tight">{value}</p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

interface KPICardsProps {
  cards: KPICardProps[];
}

export function KPICards({ cards }: KPICardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <KPICard key={card.title} {...card} />
      ))}
    </div>
  );
}
