"use client";

import { WhatsAppButton } from "./WhatsAppButton";
import { TrackedLink } from "./TrackedLink";

interface InlineCTAProps {
  page: string;
  section: string;
}

export function InlineCTA({ page, section }: InlineCTAProps) {
  return (
    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <WhatsAppButton variant="inline" page={page} section={section} />
      <TrackedLink
        href="#contato"
        trackingEvent={{
          name: "cta_click",
          page,
          section,
          button_label: "Solicitar Orçamento",
          destination: "form",
        }}
        className="inline-flex items-center justify-center rounded-md border border-foreground px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        Solicitar Orçamento
      </TrackedLink>
    </div>
  );
}
