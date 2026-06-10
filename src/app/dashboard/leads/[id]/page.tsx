import { LeadDetailClient } from "./LeadDetailClient";

export function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function LeadDetailPage() {
  return <LeadDetailClient />;
}
