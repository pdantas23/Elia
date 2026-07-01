export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles_elia: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "marketing" | "comercial";
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          role?: "marketing" | "comercial";
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "marketing" | "comercial";
          created_at?: string;
        };
      };
      leads_elia: {
        Row: {
          id: string;
          nome: string;
          whatsapp: string;
          email: string;
          tipo_projeto: "corporativo" | "evento" | "outro";
          prazo: "urgente" | "30_dias" | "60_dias" | "sem_pressa" | null;
          orcamento: "ate_2k" | "2k_3k" | "3k_5k" | "acima_5k" | "nao_definido" | null;
          observacao: string | null;
          origem_pagina: "/" | "/corporativo" | "/eventos" | "/bio";
          origem_secao: "hero" | "meio" | "final" | "whatsapp";
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_term: string | null;
          referrer: string | null;
          status: "novo" | "contatado" | "qualificado" | "proposta" | "fechado" | "perdido";
          assigned_to: string | null;
          comercial_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          whatsapp: string;
          email: string;
          tipo_projeto: "corporativo" | "evento" | "outro";
          prazo?: "urgente" | "30_dias" | "60_dias" | "sem_pressa" | null;
          orcamento?: "ate_2k" | "2k_3k" | "3k_5k" | "acima_5k" | "nao_definido" | null;
          observacao?: string | null;
          origem_pagina: "/" | "/corporativo" | "/eventos" | "/bio";
          origem_secao: "hero" | "meio" | "final" | "whatsapp";
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          referrer?: string | null;
          status?: "novo" | "contatado" | "qualificado" | "proposta" | "fechado" | "perdido";
          assigned_to?: string | null;
          comercial_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          whatsapp?: string;
          email?: string;
          tipo_projeto?: "corporativo" | "evento" | "outro";
          prazo?: "urgente" | "30_dias" | "60_dias" | "sem_pressa" | null;
          orcamento?: "ate_2k" | "2k_3k" | "3k_5k" | "acima_5k" | "nao_definido" | null;
          observacao?: string | null;
          origem_pagina?: "/" | "/corporativo" | "/eventos" | "/bio";
          origem_secao?: "hero" | "meio" | "final" | "whatsapp";
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          referrer?: string | null;
          status?: "novo" | "contatado" | "qualificado" | "proposta" | "fechado" | "perdido";
          assigned_to?: string | null;
          comercial_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
