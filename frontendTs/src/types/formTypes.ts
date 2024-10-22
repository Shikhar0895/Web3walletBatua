import { signinSchema, signupSchema } from "@/schemas";
import { z } from "zod";

export type SigninForm = z.infer<typeof signinSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
