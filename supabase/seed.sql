-- ============================================================
-- seed.sql — Dados ficticios para desenvolvimento
-- ============================================================
-- NOTA: Execute apos criar um usuario comercial via Supabase Auth
--       (e o respectivo registro em profiles_elia).

-- Exemplo de leads para desenvolvimento
insert into public.leads_elia (nome, whatsapp, email, tipo_projeto, prazo, orcamento, observacao, origem_pagina, origem_secao, utm_source, utm_medium, utm_campaign, status) values
  ('Maria Silva', '5511999990001', 'maria@exemplo.com', 'corporativo', '30_dias', '2k_3k', 'Preciso de identidade para minha loja de roupas', '/', 'hero', 'google', 'cpc', 'campanha_jan', 'novo'),
  ('Joao Santos', '5511999990002', 'joao@exemplo.com', 'corporativo', 'urgente', '3k_5k', 'Empresa de tecnologia, precisamos urgente', '/corporativo', 'final', 'instagram', 'social', 'stories_corp', 'contatado'),
  ('Ana Oliveira', '5511999990003', 'ana@exemplo.com', 'evento', '60_dias', 'acima_5k', 'Casamento em agosto, quero algo exclusivo', '/eventos', 'hero', 'instagram', 'social', 'reels_eventos', 'qualificado'),
  ('Carlos Pereira', '5511999990004', 'carlos@exemplo.com', 'corporativo', 'sem_pressa', 'nao_definido', null, '/', 'meio', 'google', 'organic', null, 'novo'),
  ('Fernanda Lima', '5511999990005', 'fernanda@exemplo.com', 'evento', '30_dias', '2k_3k', 'Festa de 15 anos da minha filha', '/eventos', 'final', null, null, null, 'proposta'),
  ('Ricardo Almeida', '5511999990006', 'ricardo@exemplo.com', 'outro', 'urgente', 'ate_2k', 'Logo simples para meu canal', '/bio', 'whatsapp', 'instagram', 'bio', null, 'perdido'),
  ('Patricia Costa', '5511999990007', 'patricia@exemplo.com', 'corporativo', '30_dias', '3k_5k', 'Rede de restaurantes precisa rebranding', '/corporativo', 'hero', 'google', 'cpc', 'campanha_fev', 'fechado'),
  ('Lucas Mendes', '5511999990008', 'lucas@exemplo.com', 'evento', 'sem_pressa', 'nao_definido', 'Evento corporativo, ainda planejando', '/', 'hero', null, null, null, 'novo'),
  ('Camila Rocha', '5511999990009', 'camila@exemplo.com', 'corporativo', '60_dias', '2k_3k', 'Clinica odontologica nova', '/corporativo', 'meio', 'google', 'cpc', 'campanha_mar', 'contatado'),
  ('Bruno Ferreira', '5511999990010', 'bruno@exemplo.com', 'evento', 'urgente', 'acima_5k', 'Casamento daqui 2 meses', '/eventos', 'hero', 'instagram', 'social', 'stories_eventos', 'qualificado');
