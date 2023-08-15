import { z } from "zod";

export const editOrCreateTodoSchema = z.object({
  title: z
    .string({ required_error: "O título é obrigatório" })
    .min(5, "O titulo deve ter pelo menos 1 caractere")
    .max(50, "O titulo deve ter no máximo 50 caracteres"),
  description: z
    .string({ required_error: "A descrição é obrigatória" })
    .min(5, "A descrição deve ter pelo menos 1 caractere")
    .max(100, "A descrição deve ter no máximo 100 caracteres"),
});
