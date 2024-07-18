import { z } from "zod";

export const createTacheFormSchema = z.object({
    nom: z.string(),
    description: z.string(),
  })