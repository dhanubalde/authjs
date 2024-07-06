"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import CardWrapper from "./card-wrapper"
import { z} from "zod"
import { ResetSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import FormError from "../form-error"
import FormSuccess from "../form-success"
import { reset } from "@/actions/reset"


const ResetForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isloading, StartTrnasition] = useState();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",

    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("")

    StartTrnasition(() => { 
      reset(values).then((data) => { 
        setSuccess(data.success);
        setError(data.error)
      })
    })
    
   }



  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-bl from-cyan-500 to-lime-400">
 
        <CardWrapper
          headerLabel="Forgot your password"
          backButtonHref="/auth/login"
          backButtonLabel="Back to login"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground text-[12px]'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johnDoe@gmail.com"
                      disabled={isloading}
                      type='email'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            {success && <FormSuccess message={success} />}
            {error && <FormError message={error} />}
            <Button
              className="w-full text-[12px]"
              disabled={isloading}
              type="submit"
            >
              Send Reset Email
            </Button>
            </form>
          </Form>  

     </CardWrapper>
   
    </div>
  )
}

export default ResetForm