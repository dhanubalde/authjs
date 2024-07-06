"use server"

import { getUserByEmail } from "@/data/user"
import { db} from "@/lib/db"
import { RegisterSchema } from "@/schema"
import bcrypt from "bcryptjs"
import {z} from "zod"

export const register = async (
  values: z.infer<typeof RegisterSchema>
) => { 
  const validationField = RegisterSchema.safeParse(values)

  if (!validationField.success) { 
    return {error: "Invalid Fields"}
  }

  const {name, email, password} = validationField.data

  const hashPassword = await bcrypt.hash(password, 10)

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) { 
    return { error: "Email already is Use!" }
  }
  
  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  })
  return { success: "Successfully Created" }
}