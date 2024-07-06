
"use server"
import { ResetSchema } from "@/schema"
import { z} from "zod"

export const reset = async (
  values: z.infer<typeof ResetSchema>
) => { 
  const validationFields = ResetSchema.safeParse(values)

  if (!validationFields) {
    return { error: "Invalid Fields" }
  }
  return {success: "Reset email sent!"}
}