import { nativePriorityEnum, nativeStateEnum, nativeMasteryEnum } from "@/app/model/projet/itemEnum";
import { z } from "zod";



const priorityEnum = z.nativeEnum(nativePriorityEnum, { message: "Champ obligatoire." })
const userStoryStateEnum = z.nativeEnum(nativeStateEnum, { message: "Champ obligatoire." })
const complexityEnum = z.nativeEnum(nativeMasteryEnum, { message: "Champ obligatoire." })

const coerceDate = z.preprocess(
  (val) => (val === '' || val === null || val === undefined ? undefined : val),
  z.coerce.date().optional()
);


export const createUserStoryFormSchema = z.object({
  nom: z.string().min(1, { message: "Champ obligatoire." }),
  id: z.string(),
  description: z.string().min(1, { message: "Champ obligatoire." }),
  priorite: priorityEnum,
  statut: userStoryStateEnum,
  version: z.string().optional(),
  maitrise: complexityEnum,
  estimation_initiale: z.coerce.number().optional(),
  date_range_effective: z.object({
    from: coerceDate,
    to: coerceDate,
  }),
  commentaires: z.string().optional(),
  new_attachments: z.array(z.instanceof(File)).optional(),
  existing_attachments: z.array(z.object({
    nom: z.string().min(1, { message: "Champ obligatoire." }),
    url: z.string().min(1, { message: "Champ obligatoire." }),
    extension: z.string().min(1, { message: "Champ obligatoire." }),
  })).optional(),
})
