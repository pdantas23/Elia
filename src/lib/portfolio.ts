import fs from "node:fs";
import path from "node:path";

import type { PortfolioEvent } from "@/components/landing/EventPortfolio";
import { CORP_PROJECT_NAMES } from "@/lib/corporateProjectNames";
import { assetPath } from "@/lib/utils";

/**
 * Lê `public/images/portfolio/<categoria>/<evento>/foto-*.webp` no build
 * (páginas são estáticas) e monta a lista de eventos do portfólio.
 * Pastas novas de eventos entram no site sem mudança de código.
 */

const PORTFOLIO_ROOT = path.join(process.cwd(), "public", "images", "portfolio");

const CATEGORIES: Array<{ dir: string; label: string; filterLabel: string }> = [
  { dir: "casamentos", label: "Casamento", filterLabel: "Casamentos" },
  { dir: "aniversarios", label: "Aniversário", filterLabel: "Aniversários" },
  { dir: "batizados", label: "Batizado", filterLabel: "Batizados" },
  { dir: "formaturas", label: "Formatura", filterLabel: "Formaturas" },
  { dir: "produtos", label: "Papelaria", filterLabel: "Papelaria" },
];

/** Nomes com acento ou grafia própria que o slug não preserva. */
const DISPLAY_NAMES: Record<string, string> = {
  "cicilia-e-malcon": "Cicília e Malcon",
  "deborah-e-joao": "Déborah e João",
  "gillian-e-caique": "Gíllian e Caíque",
  "indira-e-jv": "Indira e JV",
  "jardel-e-jr": "Jardel e Jr.",
  "lais-e-carlos": "Laís e Carlos",
  "nadia-e-daniel": "Nádia e Daniel",
  "nara-e-andre": "Nara e André",
  "tamyres-e-joao-filho": "Tamyres e João Filho",
  "taylane-e-placido": "Taylane e Plácido",
  "licia-dutra": "Lícia Dutra, 40 anos",
  "joao-hilton": "João Hilton",
  "copos-e-tacas": "Copos e Taças",
};

const LOWERCASE_WORDS = new Set(["e", "de", "do", "da", "dos", "das", "um", "uma"]);

function nameFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w, i) =>
      i > 0 && LOWERCASE_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

function listDirs(p: string): string[] {
  if (!fs.existsSync(p)) return [];
  return fs
    .readdirSync(p, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

export function getPortfolioEvents(): PortfolioEvent[] {
  const byCategory = CATEGORIES.map(({ dir, label, filterLabel }) => {
    const events = listDirs(path.join(PORTFOLIO_ROOT, dir)).flatMap((slug) => {
      const photos = fs
        .readdirSync(path.join(PORTFOLIO_ROOT, dir, slug))
        .filter((f) => f.endsWith(".webp"))
        .sort()
        .map((f) => assetPath(`/images/portfolio/${dir}/${slug}/${f}`));
      if (photos.length === 0) return [];
      return [
        {
          slug: `${dir}/${slug}`,
          name: DISPLAY_NAMES[slug] ?? nameFromSlug(slug),
          category: dir,
          categoryLabel: label,
          filterLabel,
          photos,
        },
      ];
    });
    // Eventos com mais fotos primeiro dentro da categoria.
    return events.sort((a, b) => b.photos.length - a.photos.length);
  });

  // Intercala as categorias para a visão "Todos" variar logo nas primeiras linhas.
  const interleaved: PortfolioEvent[] = [];
  const longest = Math.max(0, ...byCategory.map((c) => c.length));
  for (let i = 0; i < longest; i++) {
    for (const events of byCategory) {
      const e = events[i];
      if (e) interleaved.push(e);
    }
  }
  return interleaved;
}

/** Rótulo de exibição de cada setor (chip de filtro e legenda do card). */
const CORP_SECTOR_NAMES: Record<string, string> = {
  saude: "Saúde",
  odontologia: "Odontologia",
  "estetica-beleza": "Estética e Beleza",
  moda: "Moda",
  gastronomia: "Gastronomia",
  automotivo: "Automotivo",
  juridico: "Jurídico",
  imobiliario: "Imobiliário",
  educacao: "Educação",
  tecnologia: "Tecnologia",
  logistica: "Logística",
  contabilidade: "Contabilidade",
  turismo: "Turismo",
  eventos: "Eventos",
  comunicacao: "Comunicação",
  comercio: "Comércio",
  decoracao: "Decoração",
  otica: "Óptica",
  pet: "Pet",
  servicos: "Serviços",
  outro: "Outros",
};

/**
 * Lê `public/images/portfolio/corporativo/<setor>/<projeto>/foto-*.webp` no build.
 * Filtro = setores (pastas de 1º nível); cada card = um projeto (pasta de 2º nível).
 * Setores e projetos novos entram no site só criando a pasta, sem mudar código.
 */
export function getCorporateProjects(): PortfolioEvent[] {
  const CORPORATE_ROOT = path.join(PORTFOLIO_ROOT, "corporativo");
  const byCategory = listDirs(CORPORATE_ROOT).map((sector) => {
    const sectorLabel = CORP_SECTOR_NAMES[sector] ?? nameFromSlug(sector);
    const projects = listDirs(path.join(CORPORATE_ROOT, sector)).flatMap((slug) => {
      const photos = fs
        .readdirSync(path.join(CORPORATE_ROOT, sector, slug))
        .filter((f) => f.endsWith(".webp"))
        .sort()
        .map((f) => assetPath(`/images/portfolio/corporativo/${sector}/${slug}/${f}`));
      if (photos.length === 0) return [];
      return [
        {
          slug: `corporativo/${sector}/${slug}`,
          name: CORP_PROJECT_NAMES[slug] ?? nameFromSlug(slug),
          category: sector,
          categoryLabel: sectorLabel,
          filterLabel: sectorLabel,
          photos,
        },
      ];
    });
    // Projetos com mais fotos primeiro dentro do setor.
    return projects.sort((a, b) => b.photos.length - a.photos.length);
  });

  // Intercala os setores para a visão "Todos" variar logo nas primeiras linhas.
  const interleaved: PortfolioEvent[] = [];
  const longest = Math.max(0, ...byCategory.map((c) => c.length));
  for (let i = 0; i < longest; i++) {
    for (const projects of byCategory) {
      const p = projects[i];
      if (p) interleaved.push(p);
    }
  }
  return interleaved;
}
