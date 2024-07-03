import { z } from "zod";

export const createEnsembleFormSchema = z.object({
    nom: z.string(),
    description: z.string(),
    commentaires: z.string().optional(),
  })