import { z } from "zod/v4";

export const leadFormSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  whatsapp: z
    .string()
    .min(14, "WhatsApp inválido")
    .max(15)
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato: (11) 99999-9999"),
  email: z.string().email("E-mail inválido"),
  tipo_projeto: z.enum(["corporativo", "evento", "outro"]),
  orcamento: z
    .enum(["ate_2k", "2k_3k", "3k_5k", "acima_5k", "nao_definido"])
    .optional(),
  observacao: z.string().max(1000).optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Strip WhatsApp mask for storage
export function stripWhatsAppMask(value: string): string {
  return value.replace(/\D/g, "");
}
