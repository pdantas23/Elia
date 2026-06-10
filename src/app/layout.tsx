import type { Metadata } from "next";
import { Inter, Cormorant, Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GTMScript } from "@/components/tracking/GTMScript";
import { PixelScript } from "@/components/tracking/PixelScript";
import { PageTracker } from "@/components/tracking/PageTracker";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elia Identidade Visual",
    template: "%s | Elia Identidade Visual",
  },
  description:
    "Identidade visual aplicada, não apenas projetada. Do conceito à execução real.",
  metadataBase: new URL("https://eliaidentidadevisual.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Elia Identidade Visual",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "h-full antialiased",
        inter.variable,
        cormorant.variable,
        cormorantGaramond.variable,
        manrope.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans">
        <GTMScript />
        <PixelScript />
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
