import { nativeStateEnum } from "@/app/model/projet/itemEnum";
import { z } from "zod";

const userStoryStateEnum = z.nativeEnum(nativeStateEnum, { message: "Champ obligatoire." })

const coerceDate = z.preprocess(
  (val) => (val === '' || val === null || val === undefined ? undefined : val),
  z.coerce.date().optional()
);

export const createSprintFormSchema = z.object({
  nom: z.string(),
  description: z.string(),
  statut: userStoryStateEnum,
  estimation_initiale: z.coerce.number().optional(),
  date_range_effective: z.object({
    from: coerceDate,
    to: coerceDate,
  }).optional(),
  commentaires: z.string().optional(),
})
