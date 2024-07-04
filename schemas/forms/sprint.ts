import { z } from "zod";

export enum nativeUserStoryStateEnum {
  Non_Commencee = "Non commencée",
  Terminee = "Terminée",
}

const userStoryStateEnum = z.nativeEnum(nativeUserStoryStateEnum, { message: "Champ obligatoire." })

export const createSprintFormSchema = z.object({
  nom: z.string(),
  description: z.string(),
  us_etat: userStoryStateEnum,
  estimation_initiale: z.coerce.number().optional(),
  date_range_estim: z.object(
    {
      from: z.coerce.date(),
      to: z.coerce.date(),
    },
    {
      required_error: "Veuillez sélectionner une période de temps.",
    }
  ),
  date_range_effective: z.object(
    {
      from: z.coerce.date(),
      to: z.coerce.date().nullable().optional(),
    },
    {
      required_error: "Veuillez sélectionner une date de début.",
    }
  ),
  commentaires: z.string().optional(),
})
