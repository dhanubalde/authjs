import {z} from "zod"


export const RegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required"
  }),
  lastName: z.string().min(1, {
    message: "Last name is required"
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
  }).max(20, { message: "Password must too long" }),
})


export const LoginShema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
  }),
})