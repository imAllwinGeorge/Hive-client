import { z } from "zod";

export const userNameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters")
  .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Name must contain only letters and single spaces")
  .refine(
    (val) => !/(.)\1{2,}/.test(val),
    "Name cannot contain the same character repeated more than twice"
  );
