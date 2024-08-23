import { nativePriorityEnum, nativeStateEnum } from "@/app/model/projet/itemEnum";
import { z } from "zod";



const priorityEnum = z.nativeEnum(nativePriorityEnum, { message: "Champ obligatoire." })
const stateEnum = z.nativeEnum(nativeStateEnum, { message: "Champ obligatoire." })

const coerceDate = z.preprocess(
  (val) => (val === '' || val === null || val === undefined ? undefined : val),
  z.coerce.date().optional()
);


export const createTaskFormSchema = z.object({
  name: z.string().min(1, { message: "Champ obligatoire." }),
  description: z.string().min(1, { message: "Champ obligatoire." }),
  priority: priorityEnum,
  state: stateEnum,
  assignTask: z.boolean().default(false).optional(),
});

