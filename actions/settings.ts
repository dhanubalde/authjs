"use server"

import bcrypt from "bcryptjs"
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { SettingsSchema } from "@/schema"
import { z} from "zod"
import { db } from "@/lib/db"
import { unstable_update } from "@/auth"


export const settings = async (
  values: z.infer<typeof SettingsSchema>
) => {
  // const validatedFields = SettingsSchema.safeParse(values)

  const user = await currentUser()
  
  if (!user) {
    return { error: "Unauthorized" }
  }


  if (user.isOAuth) { 
      values.email = undefined,
      values.password = undefined,
      values.newPassword = undefined
      values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) { 
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) { 
      return { error: "Email already exists" }
    }
    return {success: "Verification email sent"}
  }

 

    const dbUser = await getUserById(user.id)
    
    if (values.password && values.newPassword && dbUser?.password) { 
      const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

    if (!passwordMatch) { 
      return { error: "Incorrect password" }
    }
      
      const  hashedPassword = await bcrypt.hash(values.newPassword, 10)
      values.password = hashedPassword;
      values.newPassword = undefined;
    }

    const updatedUser = await db.user.update({
      where: { id: dbUser?.id},
      data: {
        ...values,
      }
    });

    unstable_update({
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
        role: updatedUser.role,
      }
  
    })
    return {success: "Settings updated successfully"}
  

}