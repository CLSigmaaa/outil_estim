import { z } from "zod";

export enum nativePriorityEnum {
  Mineure = "Mineure",
  Majeure = "Majeure",
  Critique = "Critique",
}

export enum nativeUserStoryStateEnum {
  Non_Commencee = "Non commencée",
  Terminee = "Terminée",
}

export enum nativeComplexityEnum {
  Faible = "Faible",
  Moyen = "Moyen",
  Eleve = "Élevé",
}

const priorityEnum = z.nativeEnum(nativePriorityEnum, { message: "Champ obligatoire." })
const userStoryStateEnum = z.nativeEnum(nativeUserStoryStateEnum, { message: "Champ obligatoire." })
const complexityEnum = z.nativeEnum(nativeComplexityEnum, { message: "Champ obligatoire." })

export const createUserStoryFormSchema = z.object({
  nom: z.string().min(1, { message: "Champ obligatoire." }),
  id: z.string(),
  description: z.string().min(1, { message: "Champ obligatoire." }),
  priorite: priorityEnum,
  us_etat: userStoryStateEnum,
  technologies: z.string().min(1, { message: "Champ obligatoire." }),
  complexite: complexityEnum,
  estimation_initiale: z.coerce.number().optional(),
  date_range_estim: z.object(
    {
      from: z.coerce.date(),
      to: z.coerce.date(),
    },
    {
      required_error: "Veuillez sélectionner une date de début et une date de fin.",
    }
  ),
  date_range_effective: z.object(
    {
      from: z.coerce.date({
        required_error: "Veuillez sélectionner une date de début.",
      }),
      to: z.coerce.date().nullable().optional(),
    },
  ).required(),
  commentaires: z.string().optional(),
  new_attachments: z.array(z.instanceof(File)).optional(),
  existing_attachments: z.array(z.object({
    nom: z.string().min(1, { message: "Champ obligatoire." }),
    url: z.string().min(1, { message: "Champ obligatoire." }),
    extension: z.string().min(1, { message: "Champ obligatoire." }),
  })).optional(),
})
