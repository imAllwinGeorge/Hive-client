import z from "zod";
import { userNameSchema } from "./nameValidation";
import { emailSchema } from "./emailValidation";
import { passwordSchema } from "./passwordValidation";


export const registerFormSchema = z.object({
    userName: userNameSchema,
    email: emailSchema,
    password: passwordSchema,
});

export const editUserSchema = registerFormSchema.partial().omit({ password: true });