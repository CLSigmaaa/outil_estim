import { z } from "zod";

export const createProjectFormSchema = z.object({
  name: z.string().min(1, { message: "Champ obligatoire." }),
  description: z.string().min(1, { message: "Champ obligatoire." }),
})
