import { nativeStateEnum } from "@/app/model/projet/itemEnum";
import { z } from "zod";

const userStoryStateEnum = z.nativeEnum(nativeStateEnum, { message: "Champ obligatoire." })

const coerceDate = z.preprocess(
  (val) => (val === '' || val === null || val === undefined ? undefined : val),
  z.coerce.date().optional()
);

export const createSprintFormSchema = z.object({
  name: z.string().min(1, { message: "Champ obligatoire." }),
  description: z.string().min(1, { message: "Champ obligatoire." }),
  state: userStoryStateEnum,
  date_range_effective: z.object({
    from: coerceDate,
    to: coerceDate,
  }).optional(),
})
