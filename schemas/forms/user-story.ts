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
const complexityEnum = z.nativeEnum(nativeComplexityEnum)

export const createUserStoryFormSchema = z.object({
  nom: z.string(),
  description: z.string(),
  priorite: priorityEnum,
  us_etat: userStoryStateEnum,
  technologies: z.string(),
  complexite: complexityEnum.optional(),
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

export const editUserStoryFormSchema = z.object({
  nom: z.string(),
  description: z.string(),
  identifiant: z.string(),
  priorite: priorityEnum,
  us_etat: userStoryStateEnum,
  technologies: z.string(),
  complexite: complexityEnum.optional(),
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

