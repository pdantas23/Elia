-- ============================================================
-- 002_single_leads_table.sql
-- Consolidação: uma única fonte de leads para marketing E comercial.
--
-- A view public.leads_elia_marketing era um SELECT de leads_elia escondendo
-- comercial_notes/assigned_to, mas nunca foi usada (o dashboard sempre leu a
-- tabela direto). Decisão: manter SÓ a tabela leads_elia como fonte única.
--
-- A confidencialidade de comercial_notes para o papel marketing passa a ser
-- feita na aplicação (o dashboard do marketing seleciona apenas as colunas
-- permitidas; o detalhe do lead já é bloqueado para marketing). A RLS de SELECT
-- de leads_elia já libera leitura para marketing e comercial.
-- ============================================================

drop view if exists public.leads_elia_marketing;
