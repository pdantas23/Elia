-- ============================================================
-- 001_initial_schema.sql
-- Elia Identidade Visual — Schema inicial
-- ============================================================

-- ---------- PROFILES_ELIA ----------
-- Usuarios do dashboard. Sem trigger de criacao automatica:
-- perfis devem ser criados manualmente (ou via Server Action) apos
-- o signup, e a coluna `id` deve referenciar auth.users(id).
create table public.profiles_elia (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  full_name text not null default '',
  role text not null default 'marketing' check (role in ('marketing', 'comercial')),
  created_at timestamptz not null default now()
);

-- ---------- LEADS_ELIA ----------
-- Dados de origem (origem_pagina, origem_secao, utm_*, referrer) ficam
-- diretamente na tabela. O dashboard so precisa saber a origem do lead;
-- o restante do tracking de comportamento vive no GTM/Pixel.
create table public.leads_elia (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  whatsapp text not null,
  email text not null,
  tipo_projeto text not null check (tipo_projeto in ('corporativo', 'evento', 'outro')),
  prazo text not null check (prazo in ('urgente', '30_dias', '60_dias', 'sem_pressa')),
  orcamento text check (orcamento in ('ate_2k', '2k_3k', '3k_5k', 'acima_5k', 'nao_definido')),
  observacao text,
  origem_pagina text not null check (origem_pagina in ('/', '/corporativo', '/eventos', '/bio')),
  origem_secao text not null check (origem_secao in ('hero', 'meio', 'final', 'whatsapp')),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  status text not null default 'novo' check (status in ('novo', 'contatado', 'qualificado', 'proposta', 'fechado', 'perdido')),
  assigned_to uuid references public.profiles_elia(id),
  comercial_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-update updated_at on leads_elia
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_elia_set_updated_at
  before update on public.leads_elia
  for each row execute function public.set_updated_at();

-- ============================================================
-- VIEW (Marketing — sem comercial_notes nem assigned_to)
-- ============================================================

create view public.leads_elia_marketing as
select
  id, nome, whatsapp, email, tipo_projeto, prazo, orcamento,
  origem_pagina, origem_secao,
  utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  referrer, status, created_at, updated_at
from public.leads_elia;

-- ============================================================
-- RLS POLICIES
-- ============================================================

alter table public.profiles_elia enable row level security;
alter table public.leads_elia enable row level security;

-- ---------- PROFILES_ELIA ----------
create policy "Users can view own profile"
  on public.profiles_elia for select
  using (auth.uid() = id);

create policy "Users can update own profile (except role)"
  on public.profiles_elia for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------- LEADS_ELIA ----------
create policy "Authenticated staff can read leads"
  on public.leads_elia for select
  using (
    exists (
      select 1 from public.profiles_elia p
      where p.id = auth.uid()
        and p.role in ('marketing', 'comercial')
    )
  );

create policy "Service role can insert leads"
  on public.leads_elia for insert
  with check (true);

create policy "Comercial can update leads"
  on public.leads_elia for update
  using (
    exists (
      select 1 from public.profiles_elia p
      where p.id = auth.uid()
        and p.role = 'comercial'
    )
  );

create policy "Comercial can delete leads"
  on public.leads_elia for delete
  using (
    exists (
      select 1 from public.profiles_elia p
      where p.id = auth.uid() and p.role = 'comercial'
    )
  );

-- ============================================================
-- INDEXES
-- ============================================================

create index leads_elia_status_idx on public.leads_elia(status);
create index leads_elia_origem_pagina_idx on public.leads_elia(origem_pagina);
create index leads_elia_created_at_idx on public.leads_elia(created_at desc);
create index leads_elia_assigned_to_idx on public.leads_elia(assigned_to);
