import z from "zod";
import { emailSchema } from "./emailValidation";
import { passwordSchema } from "./passwordValidation";

export const loginFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});