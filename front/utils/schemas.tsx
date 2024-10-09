import { z } from "zod";

// Schéma pour les champs numériques
export const nonNullabeNumericSchema =
  z.coerce.number()
    .min(0.01, { message: "La valeur doit être supérieure à 0." })
    .max(2, { message: "La valeur ne doit pas dépasser 2." })
    .multipleOf(0.25, { message: "La valeur doit être un multiple de 0.25." });

export const nullableNumericSchema =
  z.coerce.number()
    .max(2, { message: "La valeur ne doit pas dépasser 2." })
    .multipleOf(0.25, { message: "La valeur doit être un multiple de 0.25." })
    .nullable();
