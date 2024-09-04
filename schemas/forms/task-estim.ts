import { z } from "zod";

export function createTaskEstimFormSchema(firstEstim: number, consomme: number, resteAFaire: number) {
  return (
    z.object({
      newConsomme: z.number().nonnegative({ message: "La valeur doit être positive." }),
      newResteAFaire: z.number().nonnegative({ message: "La valeur doit être positive." }),
      causeEcart: z.string().min(1, { message: "TEST" }),
      isEcartExceptionnel: z.boolean(),
    })
  );
}

