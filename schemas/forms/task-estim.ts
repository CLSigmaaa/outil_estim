import { z } from "zod";

export const createTaskEstimFormSchema = z.object({
  consommee: z.number().min(1, { message: "La valeur doit être positive." }),
  resteAFaire: z.number().min(1, { message: "La valeur doit être positive." }),
  causeEcart: z.string(),

}).required();

