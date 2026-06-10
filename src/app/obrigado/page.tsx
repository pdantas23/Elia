import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/landing/Reveal";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";

export const metadata: Metadata = {
  title: "Obrigado",
  robots: { index: false },
};

export default function ObrigadoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-clip px-5 py-12">
      <Reveal className="w-full max-w-md space-y-6 text-center">
        <h1 className="font-display text-3xl font-light tracking-tight md:text-4xl">
          Recebemos seu contato
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Em breve vamos entrar em contato para entender melhor o seu projeto.
          Se preferir, fale diretamente no WhatsApp.
        </p>
        <div className="flex flex-col items-center gap-3 pt-4">
          <WhatsAppButton variant="hero" page="/" section="obrigado" />
          <Link
            href="/"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Voltar ao site
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
