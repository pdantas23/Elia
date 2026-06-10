# CLAUDE.md — Verdade Universal do Projeto

> **Projeto:** Elia Identidade Visual — Ecossistema de Landing Pages + Dashboard
> **Cliente:** Leticia Aguiar
> **Stack:** Next.js 14+ (App Router) · TypeScript · TailwindCSS · Supabase
> **Status:** Em desenvolvimento

---

## 1. INSTRUCAO PRIMARIA AO CLAUDE CODE

**LEIA ESTE ARQUIVO ANTES DE QUALQUER ACAO.**

Este documento e a **unica fonte de verdade** do projeto. Toda decisao tecnica, visual, de copy, de UX, de arquitetura ou de fluxo deve ser validada contra este arquivo antes de ser executada.

### Regras inquebraveis:

1. **Sempre releia este arquivo** antes de iniciar uma nova task, mesmo em conversas longas.
2. **Nunca invente requisitos.** Se algo nao estiver descrito aqui, pergunte ao usuario antes de implementar.
3. **Nunca modifique este arquivo** sem autorizacao explicita do usuario.
4. **O briefing original** (`/docs/briefing-original.md`) deve ser extraido e mantido em um local separado como referencia historica. Este `CLAUDE.md` e a destilacao operacional dele.
5. **Toda decisao ambigua** deve ser resolvida consultando o secao 2 (Posicionamento) e secao 15 (O que NAO fazer).
6. **Nunca use mockups, banco de imagens generico, estetica de IA, ou linguagem generica.** Esses sao erros fatais.
7. **Trackeie absolutamente tudo** que for interacao do usuario (GTM + Meta Pixel + Supabase event log).

### Fluxo obrigatorio antes de cada task:

```
1. Reler CLAUDE.md (este arquivo)
2. Identificar a secao relevante a task
3. Validar contra Secao 15 (O que NAO fazer)
4. Validar contra Secao 2 (Posicionamento da marca)
5. Implementar
6. Marcar a task como concluida em Secao 20 (Tasks)
```

---

## INDICE

1. Instrucao Primaria
2. Posicionamento da Marca
3. Diferenciais do Negocio
4. Estrutura do Ecossistema (4 LPs + Dashboard)
5. Personas
6. Estrutura AIDA das LPs
7. Formularios
8. WhatsApp
9. Secoes Padrao
10. Direcao Visual
11. Tom de Voz e Conteudo
12. Estrategia de Conversao
13. Mobile First
14. Integracoes (GTM, Pixel, Analytics, CRM)
15. O Que NAO Fazer
16. Jornada do Usuario
17. Stack Tecnica e Arquitetura
18. Estrutura de Pastas
19. Schema do Supabase
20. **TASKS — Roadmap de Implementacao**
21. Dashboard — Especificacao Detalhada (Marketing vs Comercial)
22. Tracking — Especificacao Detalhada
23. Setup do Briefing Original

---

## 2. POSICIONAMENTO DA MARCA

O site deve transmitir:

- **Confianca**
- **Seguranca**
- **Organizacao**
- **Alto nivel de execucao**
- **Dominio tecnico em producao grafica**
- **Atendimento agil**
- **Disponibilidade**

### PONTO CRITICO (releia sempre):

> **A marca NAO vende apenas estetica. A marca vende EXECUCAO REAL.**

Toda decisao de copy, imagem, secao ou CTA deve reforcar isso.

---

## 3. DIFERENCIAIS QUE PRECISAM ESTAR CLAROS NO SITE

### Producao real (nao mockup)
- Mostrar materiais fisicos
- Fachadas, papelaria, aplicacao real
- Evitar imagens genericas

### Conhecimento tecnico
- Dominio de impressao
- Escolha de materiais
- Viabilidade real de execucao

### Atendimento 360
- Resolve do conceito ate a producao
- Pode indicar fornecedores
- Entrega completa

### Velocidade
- Resposta rapida
- Orcamento agil

### Experiencia emocional
- Cliente se emociona na entrega
- Identidade visual e o primeiro material concreto

---

## 4. ESTRUTURA DO ECOSSISTEMA

### LP1 — LINK BIO (Instagram) → `/bio`
**Funcao:** centralizar acessos, facilitar navegacao, direcionar para servicos.

**Conteudo:**
- Foto (opcional, sem depender da imagem pessoal)
- Descricao curta
- Botoes principais:
  - Identidade corporativa → `/corporativo`
  - Identidade para eventos → `/eventos`
  - Falar no WhatsApp
  - Solicitar orcamento → modal de formulario

**Layout:** vertical, mobile-first absoluto, minimalista. Nao pode parecer Linktree generico.

---

### LP2 — CORPORATIVO → `/corporativo`
**Foco:** empresas, marcas, negocios.

**Persona-alvo:** Persona 1 (Empresario).

**Entregaveis (Identidade Visual Corporativa Logo):**
- Logotipo (PNG e PDF)
- Estudo de cores e tipografias
- Manual de aplicacao
- 3 aplicacoes cortesia (papelaria, embalagens, brindes ou comunicacao visual de ponto-de-venda)
- Consultoria completa de producao: escolha de papeis e acabamentos, indicacao de fornecedores, conferencia final

---

### LP3 — CASAMENTO E EVENTOS → `/eventos`
**Foco:** noivas, eventos sociais, experiencias visuais.

**Persona-alvo:** Persona 2 (Noiva / Evento).

**Entregaveis (Identidade Visual Festiva Casamento):**
- Monograma
- Manual de aplicacao (paletas, tipografias, imagens)
- Convites impressos e/ou digital
- Menu buffet e drinks
- Brindes personalizados
- Estampa exclusiva
- Save the date
- Consultoria completa de producao: escolha de papeis e acabamentos, indicacao de fornecedores, conferencia final

---

### PRAZOS (todas as LPs aplicaveis)
- **Identidade:** 10 dias uteis apos envio completo do questionario de briefing
- **Aplicacoes:** 10 dias uteis apos aprovacao da identidade
- **Validade do orcamento:** 30 dias apos o envio

### ESTUDIO FISICO + AGENDAMENTO (obrigatorio)
- Estudio fisico em **Teresina, PI**.
- Endereco completo: **Rua das Orquideas, 781** (em `STUDIO_ADDRESS`, `src/lib/constants.ts`).
- **Atendimento presencial mediante agendamento previo.** Nunca usar "estamos sempre abertos" ou similar.
- Toda LP tem uma secao "Estudio" antes do rodape, com botao "Agendar visita" (WhatsApp).

### CONTATO REAL
- WhatsApp/Telefone: **(86) 98872-7016** → env `NEXT_PUBLIC_WHATSAPP_NUMBER=5586988727016`
- Instagram: **@eliaidentidadevisual** (`https://instagram.com/eliaidentidadevisual`)
- Pinterest: a Letícia tem pagina propria. Levar trafego para la (link no rodape de todas as LPs e na bio). URL em `PINTEREST_URL` (`src/lib/constants.ts`) **PENDENTE de confirmacao**.
- E-mail: **PENDENTE** (placeholder `CONTACT_EMAIL` em `src/lib/constants.ts`)

---

### LP4 — GENERICA (AMBOS) → `/`
**Foco:** trafego aberto, campanhas gerais, publico indeciso.

**Persona-alvo:** Persona 3 (Generica).

Esta e a **home institucional**.

**Ordem oficial das secoes da LP4 (consolidacao, jun/2026):**
1. Hero (carrossel + headline + 2 CTAs)
2. Dois Caminhos (Corporativo / Eventos)
3. Portfolio Mix (protagonista, parallax em colunas)
4. Manifesto "A expectativa e traduzir..." (no MEIO. Bloco respiro. MANTIDO como esta)
5. Como Funciona (Etapas + Prazos)
6. Quem e Leticia (card com foto vazando. MANTIDO)
7. Contato (Formulario + Estudio fundidos)
8. Rodape

> O **manifesto fica no meio**, nunca no comeco. No comeco a pessoa so quer ver "isso faz o que e como fica".

### ESTRUTURA CONSOLIDADA DE TODAS AS LPs (jun/2026)

**Menos secoes. Cada secao que sobra rouba peso do Hero, Portfolio e CTA.**

**LP2 (Corporativo) e LP3 (Eventos): 4 blocos + rodape.**
```
1. HERO          (carrossel + headline + 2 CTAs)
2. PORTFOLIO     (protagonista, parallax em colunas)
3. COMO FUNCIONA (Entregaveis + Etapas + Prazos)
4. CONTATO       (Formulario + Estudio fundidos)
5. RODAPE
```

**LP1 (Bio):** hub minimalista. Texto centralizado. Sem Problema/Solucao. Sem parallax. Estudio fica no proprio card.

**Secoes PROIBIDAS como bloco autonomo** (so existem como sub-bloco de "Como funciona" ou "Contato"):
- **Problema** (DELETADA. Insight vira, no maximo, uma frase de subtitulo no Hero)
- **Solucao**, **O que esta incluido**, **Processo**, **Prazos** → sub-blocos de "Como funciona"
- **CTA Final**, **Estudio** → sub-blocos de "Contato"

> "Como funciona" deve ocupar **menos** espaco vertical que a soma das secoes que substituiu. Se ficar maior, esta errado.

### TEXTO CENTRALIZADO (padrao em todas as LPs)
Eyebrows, titulos, subtitulos, paragrafos, listas e stepper: centralizados.
Excecoes: campos de formulario (label a esquerda), endereco na secao Contato, rodape.

### LIMITES MAXIMOS DE COPY POR ELEMENTO
| Elemento | Limite |
|---|---|
| Eyebrow | 1-3 palavras |
| Titulo de secao | 8 palavras |
| Subtitulo | 1 frase, 15 palavras |
| Descricao de bloco | 25 palavras |
| Item de lista | 8 palavras |
| Descricao de etapa | 12 palavras |

### PARALLAX (padrao)
Tecnica: framer-motion `useScroll` + `useTransform` (sem lib externa, sem `background-attachment: fixed`).
- **Portfolio:** `OliverParallax` (galeria em colunas, efeito Olivier Larose) em LP2, LP3, LP4.
- **Hero:** `ParallaxY` (deslocamento vertical sutil, +/- 24px) no carrossel de LP2, LP3, LP4.
- **Obrigatorio:** GPU (`transform-gpu`), respeitar `prefers-reduced-motion` (desliga o efeito), pausa/estabilidade no mobile.
- **LP1 (Bio): sem parallax.**

---

### DASHBOARD INTERNO → `/dashboard`
**Acesso:** privado, autenticacao via Supabase Auth.
**Roles:** `marketing` | `comercial` | `admin`.

Ver **Secao 21** para especificacao completa.

---

## 5. PERSONAS

### Persona 1 — Empresario
- Quer profissionalizar a marca
- Precisa de identidade consistente
- Ja tentou solucoes simples
- Valoriza organizacao e clareza

**Dor:** marca fraca, falta de padrao, comunicacao desorganizada.

**Vai entrar em:** `/corporativo`

---

### Persona 2 — Noiva / Evento
- Quer algo exclusivo
- Busca estetica e significado
- Valoriza detalhes
- Quer algo memoravel

**Dor:** identidade generica, falta de personalizacao, medo de algo "comum".

**Vai entrar em:** `/eventos`

---

### Persona 3 — Generica
- Nao sabe exatamente o que precisa
- Quer melhorar imagem
- Esta comecando ou evoluindo

**Vai entrar em:** `/` ou `/bio`

---

## 6. ESTRUTURA AIDA DAS LANDING PAGES

Todas as LPs (exceto bio) seguem este padrao:

### ATENCAO (Hero)
- Headline clara
- Imagem real (foto de aplicacao fisica)
- CTA imediato (WhatsApp + Formulario)
- Sem frases de impacto vazias

### INTERESSE (Problema)
- Mostrar problema real
- Conectar com situacao do cliente
- Linguagem observacional

### DESEJO (Solucao + Portfolio + Processo)
- Mostrar execucao real
- Mostrar aplicacao pratica
- Mostrar bastidores

### ACAO (CTA Final)
- Formulario simples
- Botao WhatsApp
- CTA direto

---

## 7. FORMULARIOS

### Campos:
| Campo | Tipo | Obrigatorio |
|---|---|---|
| nome | text | Sim |
| whatsapp | tel (mascara BR) | Sim |
| email | email | Sim |
| tipo_projeto | select (`corporativo`, `evento`, `outro`) | Sim |
| prazo | select (`urgente`, `30_dias`, `60_dias`, `sem_pressa`) | Sim |
| orcamento | select (`ate_2k`, `2k_3k`, `3k_5k`, `acima_5k`, `nao_definido`) | Nao |
| observacao | textarea | Nao |

### Faixas de orcamento (CORRECAO CRITICA — material oficial):
> Os pacotes base do Elia comecam em **R$2.160**. As faixas refletem isso. NUNCA baixar o piso abaixo de R$2.000.

| value | label |
|---|---|
| `ate_2k` | Ate R$2.000 |
| `2k_3k` | R$2.000 – R$3.000 |
| `3k_5k` | R$3.000 – R$5.000 |
| `acima_5k` | Acima de R$5.000 |
| `nao_definido` | Ainda nao defini |

### Posicionamento na pagina:
- No topo (hero)
- No meio (apos portfolio)
- No final (CTA de fechamento)

### Validacao:
- Zod no client + server
- Sanitizacao server-side
- Rate limiting via Supabase Edge Function ou middleware

### Apos submit:
1. Insert na tabela `leads` (Supabase)
2. Trigger Pixel + GTM (`event: lead_form_submit`)
3. Webhook opcional para CRM externo
4. Tela de agradecimento + redirecionamento para WhatsApp

---

## 8. WHATSAPP

### Aparicao obrigatoria:
- Botao **fixo** (canto inferior direito, todas as paginas exceto dashboard)
- Botao **no hero**
- Botao **apos cada bloco principal**

### Mensagem padrao:
```
Ola, vim pelo site e quero entender melhor sobre identidade visual.
```

### Variantes por LP (para tracking):
- `/corporativo` → `Ola, vim pela pagina corporativa e quero entender melhor sobre identidade visual para minha empresa.`
- `/eventos` → `Ola, vim pela pagina de eventos e quero entender melhor sobre identidade para meu evento/casamento.`
- `/` → mensagem padrao
- `/bio` → mensagem padrao

### Implementacao:
- Componente `<WhatsAppButton variant="floating" | "hero" | "inline" />`
- Link `https://wa.me/55<NUMERO>?text=<MENSAGEM_URL_ENCODED>`
- Numero configurado em `NEXT_PUBLIC_WHATSAPP_NUMBER`
- Cada clique dispara `event: whatsapp_click` com `source_section` e `source_page`

---

## 9. SECOES PADRAO DAS LPs

### Hero
- Titulo
- Subtitulo
- Imagem real
- CTA (WhatsApp + Formulario)

### Problema
- Cliente nao entende o valor
- Identidade mal aplicada
- Resultado so digital

### Solucao
- Execucao real
- Aplicacao pratica
- Suporte completo

### Portfolio
- **OBRIGATORIO ser real**
- Sem mockup
- Fotos de aplicacao fisica

### Processo
1. Briefing
2. Conceito
3. Aplicacao
4. Execucao
5. Entrega

### Quem e Leticia
**Titulo oficial (usar em TODO o site, dashboard e copy): "Diretora de Criacao do Elia".**
Nao usar "designer", "fundadora", "owner", "criadora", "responsavel" como titulo principal (podem aparecer no corpo do texto).

Persona real (do material oficial):
- Publicitaria formada pelo CEUT (2002)
- Especialista em Marketing pela UFPI (2003)
- 25 anos de experiencia com marcas
- Professora universitaria e palestrante
- Atuou como Diretora de Arte, Redatora, Diretora de Criacao e Coordenadora de Marketing em diversas agencias
- Foi socia de uma agencia de publicidade por 12 anos antes de criar o Elia
- Hoje e Diretora de Criacao do Elia
- Origem do nome: **Elia = L (Leticia) + A (Aguiar)** — citar na secao "Quem e Leticia"
- Origem familiar criativa: bisavo jornalista/escritor, tio artista plastico, familia materna em projetos culturais em Teresina, pai publicitario

Bloco curto de referencia (tom sobrio, observacional):
> Leticia Aguiar e Diretora de Criacao do Elia. Publicitaria com 25 anos em marcas, especialista em marketing, foi socia de agencia de publicidade por 12 anos antes de criar o estudio. O nome Elia vem da composicao do proprio nome: L de Leticia, A de Aguiar.

Sem depender de imagem pessoal (a foto e opcional/pendente de autorizacao).

### Prova Social
- Depoimentos
- Resultados reais
- Volume de marcas

### CTA Final
- Formulario
- WhatsApp

---

## 10. DIRECAO VISUAL

### PRINCIPIO: MOSTRAR ANTES DE EXPLICAR (feedback da cliente, jun/2026)

> O publico (empresarios, noivas, indeciso do Instagram) **escaneia, nao le**. Especialmente no mobile. Imagem domina, texto e apoio.

- **Toda secao textual precisa de imagem** ao lado, abaixo ou intercalada. Texto sozinho e excecao, nao regra.
- **Imagem ja no hero**, no comeco da pagina (foto real de aplicacao fisica protagonizando, nao logo em PDF).
- **Texto enxuto por bloco:** no maximo 1 titulo curto, 1-2 frases de subtitulo, 3-4 bullets. Cortar paragrafos longos. Observacional != longo.
- Onde faltar foto real, usar **placeholder honesto** com legenda "Foto real a inserir", nunca mockup ou stock.
- Hero carrega imediato (`priority` no `next/image`), sem lazy load agressivo na primeira imagem.
- Isso **nao contradiz** o tom observacional/contemplativo: a copy continua sobria, muda o **peso visual**.

### Deve seguir:
- **Minimalismo**
- **Organizacao**
- **Simetria**
- **Estetica limpa**
- **Sem poluicao visual**

### Evitar:
- Canva visivel
- Estetica de IA
- Excesso de cor
- Layouts carregados
- Gradientes "fofos"
- Icones genericos demais (lucide pode ser usado com parcimonia)
- Glassmorphism, neumorphism, ou qualquer "tendencia" datada

### Paleta (sugestao a confirmar com Leticia):
- **Base:** off-white / bone (`#F7F5F2`)
- **Texto principal:** preto profundo (`#0A0A0A`)
- **Acento:** definir com a Leticia (provavel neutro escuro ou tom terroso)
- **Apoio:** cinzas neutros (`#E8E5E0`, `#A8A39C`)

> **Nao decidir paleta sozinho.** Antes de finalizar tokens, perguntar.

### Tipografia (sugestao a confirmar):
- **Display/Titulos:** serifa moderna (ex: Fraunces, Cormorant, ou similar)
- **Corpo:** sans neutra (ex: Inter, Geist Sans)

### Espacamento:
- Generoso. Whitespace e parte da composicao.
- Grid de 8px.
- Container max-width: `1280px` (desktop), padding lateral confortavel no mobile.

### Imagens:
- **Sempre reais.** Trabalhos executados.
- Tratamento fotografico coeso (mesma temperatura, mesma luz).
- Aspect ratios consistentes (preferencia por 4:5 e 3:2).
- Nunca usar Unsplash generico, gerador de imagem IA, ou mockups de cena.

---

## 11. TOM DE VOZ E CONTEUDO

### Seguir:
- **Observacional** (descreve, nao vende)
- **Tecnico leve** (mostra dominio sem jargao)
- **Contemplativo** (deixa o leitor pensar)

### Evitar:
- Humor
- Trends
- Frases prontas ("transforme sua marca", "leve seu negocio ao proximo nivel")
- Conteudo generico
- Emojis no copy do site (no dashboard tudo bem)
- Exclamacoes em excesso
- Caixa alta gratuita
- **Travessoes (— / em dash).** Nunca, em hipotese alguma. Usar virgula, dois-pontos ou ponto final.

### Exemplos de copy aprovado vs reprovado:

| Reprovado | Aprovado |
|---|---|
| "Transforme sua marca agora!" | "Identidade visual aplicada, nao apenas projetada." |
| "A melhor identidade visual do mercado" | "Cada projeto entregue sai do papel e chega a fachada, ao convite, ao material." |
| "Faca seu orcamento e leve seu negocio adiante" | "Conte sobre o projeto. A conversa comeca pelo entendimento." |

### Frases oficiais aprovadas pela marca (usar com sobriedade):
- "Solucoes visuais para cada empresa." / "...para cada evento."
- "Produtos visuais desenvolvidos para tornar a sua marca/festa unica e memoravel, alem da expectativa."
- "A expectativa e traduzir todo o espirito da sua marca / da sua festa em um projeto de identidade visual unico e marcante."
- "Especialista em tornar a sua expectativa uma experiencia real."
- "Para personalizar uma solucao, agende uma visita." (usar na secao Estudio)

### Conceito-chave (fio condutor):
**"Alem da expectativa" / "expectativa virando experiencia real".** Aparece 2-3 vezes na LP inteira (hero, solucao ou CTA), sem virar slogan repetido em cada bloco.

---

## 12. ESTRATEGIA DE CONVERSAO

- CTA distribuido (3+ pontos por pagina)
- Fluxo simples
- Poucos cliques (maximo 2 do landing ao contato)
- Decisao rapida

### Hierarquia de CTAs:
1. **Primario:** WhatsApp (decisao imediata)
2. **Secundario:** Formulario (lead frio / qualificacao)

---

## 13. MOBILE

- **Prioridade total.** Construir mobile-first.
- Leitura facil (16px base minimo)
- Botoes grandes (minimo 44x44px de area de toque)
- Carregamento leve (LCP < 2.5s, CLS < 0.1)
- Imagens otimizadas via `next/image` com `priority` nos heroes
- Lazy load no portfolio

---

## 14. INTEGRACOES

### Obrigatorias:
- **WhatsApp** (deeplink)
- **Supabase** (banco + auth + storage)
- **Meta Pixel** (`fbq`)
- **Google Tag Manager** (`dataLayer`)
- **Google Analytics 4** (via GTM)

### Opcionais (preparar pontos de extensao):
- CRM externo via webhook (RD Station, HubSpot, etc.)
- Email transacional via Resend ou Supabase Auth

### Variaveis de ambiente (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=5586988727016
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
CRM_WEBHOOK_URL= (opcional)
RESEND_API_KEY= (opcional)
```

---

## 15. O QUE NAO FAZER (RELEIA SEMPRE)

- Usar mockups
- Usar banco de imagem generico
- Linguagem generica ("transforme", "potencialize", "alavanque")
- Layout poluido
- Parecer "IA" (gradientes neon, icones flutuantes, glow effects)
- Parecer amador (sombras pesadas, animacoes exageradas)
- Carrosseis automaticos sem pausa
- Pop-ups intrusivos
- Hero com video de banco de imagem
- Sessao "nossos clientes" com logos esticadas/distorcidas
- Emojis no copy do site
- Modos escuros desnecessarios (a marca e luminosa, branca, limpa)
- **Travessoes (— / em dash) em QUALQUER lugar.** Proibido em copy, em titulos e principalmente na contagem/numeracao de itens (ex: nada de "— 01"). Reescrever com virgula, dois-pontos ou ponto final. (REINCIDENTE: ja foi pedido para remover 3x. Nao repetir.)
- **Fundo com a repeticao do logo (pattern / watermark / textura com a marca Eliá).** Proibido em hero, secoes ou rodape. A cliente pediu remocao explicita (jun/2026). Usar fundo limpo (cor base do manual) ou imagem real do portfolio. Remover do codigo, nao apenas esconder.
- **Muito texto antes da primeira imagem.** Ver Secao 10, "Mostrar antes de explicar". Imagem ja no hero, portfolio cedo na rolagem.
- **Citar o Pinterest de forma negativa no copy** (ex: "referencia generica do Pinterest"). A Letícia tem pagina propria no Pinterest. Em vez de criticar, levar trafego para a pagina dela (ver Secao "CONTATO REAL").

---

## 16. JORNADA DO USUARIO

1. Entra no site (via ads, organico, Instagram bio)
2. Se identifica (Hero + Problema)
3. Ve trabalhos reais (Portfolio)
4. Entende valor (Solucao + Processo)
5. Confia (Prova social + Quem e Leticia)
6. Entra em contato (WhatsApp ou Formulario)

---

## 17. STACK TECNICA E ARQUITETURA

### Stack:
- **Next.js 14+** (App Router, Server Components por padrao)
- **TypeScript** strict mode
- **TailwindCSS** v3+ com config customizada
- **Supabase** (Postgres + Auth + Storage + RLS)
- **Zod** para validacao
- **React Hook Form** para formularios
- **shadcn/ui** como base de componentes (instalar sob demanda, customizar para o design)
- **Lucide React** para icones (uso parcimonioso)
- **Framer Motion** para animacoes sutis (apenas onde realmente agregar)

### Principios:
- Server Components por padrao; Client Components so quando necessario (`'use client'`)
- Server Actions para mutations sempre que possivel
- RLS (Row Level Security) **ativada em todas as tabelas**
- Nenhum segredo no client. Service Role Key so em Server Actions ou Route Handlers
- TypeScript estrito: `strict: true`, `noUncheckedIndexedAccess: true`
- Path aliases: `@/components`, `@/lib`, `@/app`, etc.

### Performance:
- Imagens via `next/image`
- Fontes via `next/font`
- Static generation para LPs (revalidacao ISR para portfolio se vier do Supabase)
- Lighthouse target: Performance >= 95, Accessibility >= 95, Best Practices = 100, SEO = 100

---

## 18. ESTRUTURA DE PASTAS

```
/
├── CLAUDE.md                    ← VERDADE UNIVERSAL (este arquivo)
├── docs/
│   └── briefing-original.md     ← briefing original extraido (referencia historica)
├── public/
│   ├── images/portfolio/        ← fotos reais
│   └── og/                      ← Open Graph
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← layout raiz com GTM/Pixel
│   │   ├── page.tsx             ← LP4 (generica /)
│   │   ├── bio/page.tsx         ← LP1
│   │   ├── corporativo/page.tsx ← LP2
│   │   ├── eventos/page.tsx     ← LP3
│   │   ├── obrigado/page.tsx    ← thank you
│   │   ├── api/
│   │   │   ├── leads/route.ts   ← POST lead
│   │   │   └── webhook/route.ts ← webhook CRM
│   │   ├── login/page.tsx       ← Supabase Auth
│   │   └── dashboard/
│   │       ├── layout.tsx       ← auth guard + role check
│   │       ├── page.tsx         ← visao geral
│   │       └── leads/
│   │           ├── page.tsx     ← tabela com filtros
│   │           └── [id]/page.tsx← detalhe (so comercial/admin)
│   ├── components/
│   │   ├── ui/                  ← shadcn customizado
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Problema.tsx
│   │   │   ├── Solucao.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Processo.tsx
│   │   │   ├── QuemELeticia.tsx
│   │   │   ├── ProvaSocial.tsx
│   │   │   ├── CTAFinal.tsx
│   │   │   ├── LeadForm.tsx
│   │   │   └── WhatsAppButton.tsx
│   │   ├── dashboard/
│   │   │   ├── LeadsTable.tsx
│   │   │   ├── LeadFilters.tsx
│   │   │   ├── LeadDetailDrawer.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── KPICards.tsx
│   │   │   └── ChartLeadsPorOrigem.tsx
│   │   └── tracking/
│   │       ├── GTMScript.tsx
│   │       ├── PixelScript.tsx
│   │       └── TrackedButton.tsx ← wrapper que dispara eventos
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        ← browser client
│   │   │   ├── server.ts        ← server client
│   │   │   └── admin.ts         ← service role (server-only)
│   │   ├── tracking/
│   │   │   ├── events.ts        ← catalogo de eventos
│   │   │   ├── gtm.ts           ← dataLayer.push
│   │   │   └── pixel.ts         ← fbq
│   │   ├── validators/
│   │   │   └── lead.ts          ← Zod schemas
│   │   ├── whatsapp.ts          ← gera links
│   │   └── utils.ts
│   ├── server/
│   │   └── actions/
│   │       ├── leads.ts         ← create, update status, list
│   │       └── auth.ts
│   ├── types/
│   │   ├── database.ts          ← gerado pelo Supabase CLI
│   │   └── lead.ts
│   └── styles/
│       └── globals.css
├── supabase/
│   ├── migrations/              ← SQL migrations
│   └── seed.sql
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 19. SCHEMA DO SUPABASE

### Tabelas:

#### `profiles`
| coluna | tipo | notas |
|---|---|---|
| id | uuid (PK, FK auth.users) | |
| email | text | |
| full_name | text | |
| role | text | `marketing` \| `comercial` \| `admin` |
| created_at | timestamptz | default now() |

#### `leads`
| coluna | tipo | notas |
|---|---|---|
| id | uuid (PK) | default gen_random_uuid() |
| nome | text | not null |
| whatsapp | text | not null |
| email | text | not null |
| tipo_projeto | text | `corporativo` \| `evento` \| `outro` |
| prazo | text | `urgente` \| `30_dias` \| `60_dias` \| `sem_pressa` |
| orcamento | text | nullable |
| observacao | text | nullable |
| origem_pagina | text | `/`, `/corporativo`, `/eventos`, `/bio` |
| origem_secao | text | `hero`, `meio`, `final`, `whatsapp` |
| utm_source | text | nullable |
| utm_medium | text | nullable |
| utm_campaign | text | nullable |
| utm_content | text | nullable |
| utm_term | text | nullable |
| referrer | text | nullable |
| status | text | `novo` \| `contatado` \| `qualificado` \| `proposta` \| `fechado` \| `perdido` (default `novo`) |
| assigned_to | uuid (FK profiles) | nullable |
| comercial_notes | text | nullable (so comercial/admin acessa) |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

#### `lead_status_history`
| coluna | tipo | notas |
|---|---|---|
| id | uuid (PK) | |
| lead_id | uuid (FK leads) | cascade |
| from_status | text | |
| to_status | text | |
| changed_by | uuid (FK profiles) | |
| note | text | nullable |
| created_at | timestamptz | |

#### `tracking_events`
| coluna | tipo | notas |
|---|---|---|
| id | uuid (PK) | |
| event_name | text | ex: `cta_click`, `whatsapp_click`, `form_submit`, `page_view` |
| page | text | path |
| section | text | nullable |
| button_label | text | nullable |
| session_id | text | |
| user_agent | text | |
| utm_source | text | nullable |
| utm_medium | text | nullable |
| utm_campaign | text | nullable |
| metadata | jsonb | nullable |
| created_at | timestamptz | |

### RLS (Row Level Security):

**`leads`**
- `SELECT`: usuarios com role `marketing`, `comercial`, `admin` podem ler.
  - **Marketing:** ve todos os campos EXCETO `comercial_notes` (mascarar via view ou coluna politica).
  - **Comercial/Admin:** ve tudo.
- `INSERT`: publico (anon) pode inserir (via API route com rate limit) → na pratica, INSERT via Service Role na Server Action.
- `UPDATE`: apenas `comercial` e `admin`. Marketing **nao pode** alterar status.
- `DELETE`: apenas `admin`.

**`tracking_events`**
- `SELECT`: `marketing`, `comercial`, `admin`.
- `INSERT`: Service Role (via Server Action / API).

**`profiles`**
- `SELECT`: proprio usuario ou `admin`.
- `UPDATE`: proprio usuario (exceto campo `role`, que so `admin` altera).

### View para Marketing (esconde `comercial_notes`):

```sql
create view leads_marketing as
select
  id, nome, whatsapp, email, tipo_projeto, prazo, orcamento,
  origem_pagina, origem_secao,
  utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  referrer, status, created_at, updated_at
from leads;
```

> Aplicar RLS na view tambem.

---

## 20. TASKS — ROADMAP DE IMPLEMENTACAO

> **Regra:** marcar `[x]` apos concluir. Nao pular ordem sem motivo tecnico.
> **Antes de cada task: reler CLAUDE.md.**

### FASE 0 — Setup

- [x] **0.1** Extrair o briefing original para `/docs/briefing-original.md` (referencia historica).
- [x] **0.2** Inicializar projeto Next.js 14+ com App Router, TypeScript strict, Tailwind, ESLint.
- [x] **0.3** Configurar `tsconfig.json` com `strict: true`, `noUncheckedIndexedAccess: true`, paths aliases.
- [ ] **0.4** Configurar `tailwind.config.ts` com tokens da marca (cores, fontes, espacamentos). **Pedir confirmacao da paleta antes de finalizar.** (tokens provisorios aplicados em globals.css — aguardando confirmacao da Leticia)
- [x] **0.5** Configurar `next/font` (serifa display + sans corpo). (Inter + Cormorant)
- [x] **0.6** Criar `.env.local.example` com todas as variaveis listadas na Secao 14.
- [x] **0.7** Instalar dependencias base: `@supabase/ssr`, `@supabase/supabase-js`, `zod`, `react-hook-form`, `@hookform/resolvers`, `lucide-react`, `clsx`, `tailwind-merge`, `framer-motion`.
- [x] **0.8** Configurar shadcn/ui (`npx shadcn@latest init`) com tema custom.
- [x] **0.9** Estruturar pastas conforme Secao 18.

### FASE 1 — Supabase

- [ ] **1.1** Criar projeto Supabase e configurar URL/keys nas envs. (aguardando credenciais)
- [x] **1.2** Criar migration `001_initial_schema.sql` com tabelas `profiles`, `leads`, `lead_status_history`, `tracking_events`.
- [x] **1.3** Criar trigger `handle_new_user()` que insere em `profiles` quando um auth.user e criado (role default `marketing`).
- [x] **1.4** Criar trigger `set_updated_at()` para `leads`.
- [x] **1.5** Criar trigger `log_status_change()` que escreve em `lead_status_history` quando `status` muda.
- [x] **1.6** Criar view `leads_marketing` (sem `comercial_notes`).
- [x] **1.7** Criar policies RLS conforme Secao 19.
- [x] **1.8** Gerar tipos TypeScript manualmente em `src/types/database.ts`.
- [x] **1.9** Criar `src/lib/supabase/{client,server,admin}.ts` (clients browser, server e service role).
- [x] **1.10** Criar seed com dados ficticios de leads para desenvolvimento (`supabase/seed.sql`).

### FASE 2 — Sistema de Design

- [x] **2.1** Criar tokens em `globals.css` (cores, espacamentos, fontes). Tokens provisorios — paleta pendente.
- [x] **2.2** Criar componentes base UI: `Button` (via shadcn customizado).
- [x] **2.3** Criar componente `<Container>` para max-width consistente.
- [x] **2.4** Criar componente `<Section>` com padding vertical padronizado.
- [ ] **2.5** Validar visualmente em mobile (375px), tablet (768px), desktop (1280px, 1440px).
- [ ] **2.6** Validar contraste WCAG AA em todos os componentes.

### FASE 3 — Tracking (Infraestrutura)

- [x] **3.1** Criar `src/lib/tracking/events.ts` com catalogo tipado de eventos.
- [x] **3.2** Criar `src/lib/tracking/gtm.ts` (dataLayer.push tipado).
- [x] **3.3** Criar `src/lib/tracking/pixel.ts` (`fbq` tipado).
- [x] **3.4** Criar `<GTMScript>` e `<PixelScript>` em `src/components/tracking/`.
- [x] **3.5** Injetar scripts no `app/layout.tsx` (com `next/script` strategy adequada).
- [x] **3.6** Criar wrapper `<TrackedButton>` que dispara GTM + Pixel + insert em `tracking_events` ao clicar.
- [x] **3.7** Criar `<PageTracker>` para disparar `page_view` ao navegar.
- [x] **3.8** Criar utility para capturar UTMs da URL e persistir em sessionStorage.

### FASE 4 — LP4 (Home Generica `/`)

- [x] **4.1** Construir `Hero` com headline, subtitulo, placeholder imagem, CTA WhatsApp + Formulario.
- [x] **4.2** Construir secao `Problema`.
- [x] **4.3** Construir secao `Solucao`.
- [x] **4.4** Construir secao `Portfolio` (grid responsivo com placeholders para fotos reais).
- [x] **4.5** Construir secao `Processo` (5 etapas).
- [x] **4.6** Construir secao `QuemELeticia`.
- [x] **4.7** Construir secao `ProvaSocial`.
- [x] **4.8** Construir secao `CTAFinal` com `LeadForm`.
- [x] **4.9** Adicionar `WhatsAppButton` flutuante.
- [x] **4.10** SEO: metadata, Open Graph.
- [ ] **4.11** Validar Lighthouse mobile >= 95 em Performance, A11y, SEO. (requer deploy)

### FASE 5 — LP2 (Corporativo `/corporativo`)

- [x] **5.1** Adaptar copy para Persona 1 (Empresario).
- [x] **5.2** Selecionar portfolio focado em projetos corporativos (placeholders).
- [x] **5.3** Reaproveitar componentes da LP4 com props de copy.
- [x] **5.4** SEO + Open Graph especificos.
- [x] **5.5** `origem_pagina` = `/corporativo` em todos os forms e CTAs.

### FASE 6 — LP3 (Eventos `/eventos`)

- [x] **6.1** Adaptar copy para Persona 2 (Noiva / Evento).
- [x] **6.2** Selecionar portfolio focado em casamentos e eventos sociais (placeholders).
- [x] **6.3** Reaproveitar componentes.
- [x] **6.4** SEO + Open Graph especificos.
- [x] **6.5** `origem_pagina` = `/eventos` em todos os forms e CTAs.

### FASE 7 — LP1 (Link Bio `/bio`)

- [x] **7.1** Layout vertical, mobile-first absoluto.
- [x] **7.2** Foto opcional (placeholder circular).
- [x] **7.3** Descricao curta.
- [x] **7.4** 4 botoes: Corporativo, Eventos, WhatsApp, Orcamento.
- [x] **7.5** Cada botao trackeado individualmente.
- [x] **7.6** Sem aparencia de Linktree generico.

### FASE 8 — Formularios e Submissao

- [x] **8.1** Criar Zod schema em `src/lib/validators/lead.ts`.
- [x] **8.2** Construir `<LeadForm>` com React Hook Form + Zod.
- [x] **8.3** Aplicar mascara BR no WhatsApp.
- [x] **8.4** Criar Server Action `createLead` em `src/server/actions/leads.ts`.
- [x] **8.5** A Server Action: valida, sanitiza, insere via Service Role, dispara evento `form_submit`.
- [ ] **8.6** Implementar rate limit (ex: 5 submits / hora / IP via tabela ou Upstash).
- [x] **8.7** Pagina `/obrigado` com agradecimento + CTA WhatsApp.
- [x] **8.8** Webhook opcional para CRM (`/api/webhook`).

### FASE 9 — Auth e Dashboard (Setup)

- [ ] **9.1** Configurar Supabase Auth (aguardando credenciais).
- [x] **9.2** Criar `/login` page.
- [x] **9.3** Criar middleware Next.js para proteger `/dashboard/*`.
- [x] **9.4** Criar layout `/dashboard/layout.tsx` com verificacao de sessao, role, sidebar, logout.
- [x] **9.5** Role guarding implementado no layout e nas pages.

### FASE 10 — Dashboard Marketing

- [x] **10.1** Criar `/dashboard/page.tsx` com KPI cards.
- [x] **10.2** Criar `/dashboard/leads/page.tsx` com tabela de leads.
- [x] **10.3** Colunas da tabela: Data, Nome, Origem, UTM Source, Status, Tipo Projeto.
- [x] **10.4** Componente `<LeadFilters>` com filtros completos.
- [x] **10.5** Persistir filtros na URL (search params).
- [x] **10.6** Paginacao (20 por pagina).
- [x] **10.7** Export CSV dos leads filtrados.
- [x] **10.8** Bloquear acesso a `/dashboard/leads/[id]` para role `marketing`.
- [x] **10.9** Grafico de leads por origem (barra horizontal).
- [ ] **10.10** Grafico de conversao por LP.

### FASE 11 — Dashboard Comercial

- [x] **11.1** Tabela de leads com coluna de acoes (link Ver).
- [x] **11.2** Criar `/dashboard/leads/[id]/page.tsx` com detalhe completo do lead.
- [x] **11.3** Server Actions: `updateLeadStatus`, `updateLeadNotes`, `assignLead`.
- [x] **11.4** RLS definida na migration (UPDATE so para comercial/admin).
- [ ] **11.5** Notificacao visual (toast) ao mudar status.

### FASE 12 — QA, Performance, Deploy

- [ ] **12.1** Testes E2E criticos com Playwright.
- [ ] **12.2** Validar Lighthouse em todas as LPs.
- [ ] **12.3** Validar tracking em todas as acoes.
- [ ] **12.4** Validar RLS.
- [ ] **12.5** Configurar deploy na Vercel.
- [ ] **12.6** Configurar dominio + SSL.
- [ ] **12.7** Configurar Supabase em producao.
- [ ] **12.8** Validar GA4 em producao.
- [ ] **12.9** Smoke test em producao.

---

## 21. DASHBOARD — ESPECIFICACAO DETALHADA

### Acesso e Roles

| Role | Pode ver dashboard | Pode ver tabela | Pode ver detalhe do lead | Pode ver comercial_notes | Pode mudar status | Pode editar notes |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| `marketing` | Sim | Sim (sem notes) | Nao | Nao | Nao | Nao |
| `comercial` | Sim | Sim (completa) | Sim | Sim | Sim | Sim |
| `admin` | Sim | Sim | Sim | Sim | Sim | Sim |

### Dashboard Marketing — O que ve

**Objetivo:** entender de onde vem os leads, qual campanha performa, qual LP converte mais.

**Componentes:**
1. **KPI Cards (topo):**
   - Total de leads (periodo)
   - Leads novos hoje
   - Taxa de conversao (form submits / page views) por LP
   - Origem mais frequente

2. **Grafico de leads por origem** (barra ou pizza)
   - Por `origem_pagina`
   - Por `utm_source`
   - Por `utm_campaign`

3. **Tabela de leads** (usa view `leads_marketing`):
   - **Colunas visiveis:** Data, Nome, Email, WhatsApp, Origem Pagina, UTM Source, UTM Campaign, Tipo Projeto, Status
   - **Colunas escondidas para marketing:** `comercial_notes`, `assigned_to`
   - **Filtros:** Status, Data, Origem pagina, UTM Source/Medium/Campaign, Tipo projeto, Busca por nome
   - **Botao "Limpar filtros"** sempre visivel
   - **Botao "Exportar CSV"**
   - Paginacao server-side (20 por pagina)

4. **Sem botao de acao** (nao pode abrir detalhe).

### Dashboard Comercial — O que ve

**Objetivo:** trabalhar o lead, mover no funil, converter em cliente.

**Componentes:**
1. **KPI Cards (focados em conversao):**
   - Leads novos (a contatar)
   - Em negociacao (proposta enviada)
   - Fechados no mes
   - Tempo medio entre `novo` e `fechado`

2. **Tabela de leads** (usa tabela `leads` completa):
   - Mesmas colunas + coluna **Acoes**
   - Filtros adicionais: `assigned_to` (meus leads / todos)
   - Click na linha → abre `<LeadDetailDrawer>` ou navega para `/dashboard/leads/[id]`

3. **Detalhe do Lead (`LeadDetailDrawer` ou page):**
   - Dados completos (nome, whatsapp, email, tipo, prazo, orcamento, observacao)
   - UTMs e origem
   - Status atual + dropdown para mudar
   - Historico de status
   - Campo `comercial_notes` (textarea, save on blur)
   - Atribuicao (`assigned_to`)
   - Botao **"Abrir WhatsApp"** com mensagem pre-preenchida
   - Botao **"Enviar email"** (mailto: ou integracao futura)

4. **Quick actions na tabela:**
   - Mudar status sem abrir drawer (inline select)

### Layout do Dashboard

- Sidebar lateral fixa (desktop) / Drawer (mobile)
- Itens visiveis por role
- Header com nome do usuario, role badge, logout
- Responsivo: tabela vira cards no mobile

---

## 22. TRACKING — ESPECIFICACAO DETALHADA

### Principio

> **Todo botao e trackeado.** Em GTM, em Pixel, e em `tracking_events` (Supabase).

### Catalogo de eventos (`src/lib/tracking/events.ts`)

```typescript
export type TrackingEvent =
  | { name: 'page_view'; page: string; }
  | { name: 'cta_click'; page: string; section: string; button_label: string; destination: 'whatsapp' | 'form' | 'internal'; }
  | { name: 'whatsapp_click'; page: string; section: string; variant: 'floating' | 'hero' | 'inline'; }
  | { name: 'form_view'; page: string; section: string; }
  | { name: 'form_field_focus'; page: string; field: string; }
  | { name: 'form_submit_attempt'; page: string; section: string; }
  | { name: 'form_submit_success'; page: string; section: string; lead_id: string; tipo_projeto: string; }
  | { name: 'form_submit_error'; page: string; section: string; error: string; }
  | { name: 'scroll_depth'; page: string; depth: 25 | 50 | 75 | 100; }
  | { name: 'portfolio_item_click'; page: string; item_id: string; }
  | { name: 'bio_link_click'; destination: 'corporativo' | 'eventos' | 'whatsapp' | 'orcamento'; };
```

### Para cada evento, disparar em paralelo:
1. **GTM** → `window.dataLayer.push({ event: eventName, ...payload })`
2. **Meta Pixel** → `fbq('trackCustom', eventName, payload)` (e `Lead` em form submit success)
3. **Supabase** → insert em `tracking_events` (fire-and-forget, nao bloqueia UI)

### Componente `<TrackedButton>`:

```typescript
<TrackedButton
  trackingEvent={{
    name: 'cta_click',
    page: '/corporativo',
    section: 'hero',
    button_label: 'Falar no WhatsApp',
    destination: 'whatsapp',
  }}
  onClick={...}
>
  Falar no WhatsApp
</TrackedButton>
```

### Eventos Meta Pixel padrao a usar:
- `PageView` (automatico no carregamento)
- `ViewContent` (em portfolio item click)
- `Contact` (em whatsapp_click)
- `Lead` (em form_submit_success — **mais importante**)

### UTMs:
- Capturar de `searchParams` na primeira visita
- Persistir em `sessionStorage` (chave: `elia_utms`)
- Incluir no payload de `createLead`

---

## 23. SETUP DO BRIEFING ORIGINAL

### Instrucao para o Claude Code:

Na primeira execucao (Task 0.1), o briefing original (texto bruto fornecido pela Leticia) deve ser:

1. Copiado para `/docs/briefing-original.md`
2. Mantido como referencia **read-only** (nao editar)
3. Este `CLAUDE.md` e a destilacao operacional dele

**Por que separar?**
- O `CLAUDE.md` e a verdade operacional (clara, estruturada, acionavel).
- O `briefing-original.md` e o registro historico (preserva o que o cliente disse na reuniao, sem interpretacao).
- Se houver duvida, sempre consultar o `CLAUDE.md`. Se houver conflito real, perguntar a Leticia.

---

## FECHAMENTO

> Se voce (Claude Code) esta lendo isto antes de uma task: **bom**. Esse e o caminho certo.
> Se voce esta prestes a tomar uma decisao criativa ou tecnica que nao esta coberta aqui: **pare e pergunte**.
> Se voce esta prestes a usar um mockup, um banco de imagem, uma frase pronta, ou uma estetica "de IA": **pare e relembre a Secao 15**.

**A marca vende EXECUCAO REAL. O site precisa parecer isso.**
