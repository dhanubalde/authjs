import {z} from "zod"
import { UserRole } from "@prisma/client"

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
  }).max(20, { message: "Password must too long" }),
})


export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
  }).max(20, { message: "Password must too long" }),
  code: z.optional(z.string()),
})



export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => { 
    if (data.password && !data.newPassword) { 
      return false; 
    }
  }, {
    message: "New password is required",
    path: ["newPassword"]
  })
  .refine((data) => { 
    if (data.newPassword && !data.password) { 
      return false; 
    }
  }, {
    message: "Password is required",
    path: ["password"]
  })


export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});
