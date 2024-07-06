"use client"
import React, { startTransition, useState, useTransition } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsSchema } from '@/schema'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormSuccess from '../form-success'
import FormError from '../form-error'
import { settings } from '@/actions/settings'




const Settings = () => {
  const user = useCurrentUser()
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isloading, StartTrnasition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      role: user?.role || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => { 

    StartTrnasition(() => { 
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }
          if (data.success) {
            setSuccess(data.success)
          }
        })
        .catch(() => setError("Something went wrong!"));
    })
    
  }

  return (
    <div className=' shadow-xl mt-4'>
      <Card className=' w-[600px]'>
        <CardHeader>
          <p className=' text-md font-semibold text-center'>
            Settings
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-4'>
              <div className=' space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-[12px]'>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isloading}
                        placeholder='John Doe'
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
                
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=' text-[12px]'>Email</FormLabel>
                        <FormControl>
                          <Input
                             {...field}
                            placeholder="john@example.com"
                            disabled={isloading}
                            type="email"
                          />
                        </FormControl> 
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=' text-[12px]'>Password</FormLabel>
                        <FormControl>
                          <Input
                             {...field}
                            placeholder="******"
                            type="password"
                            disabled={isloading}
                          />
                        </FormControl> 
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=' text-[12px]'>New Password</FormLabel>
                        <FormControl>
                          <Input
                             {...field}
                            placeholder="******"
                            type="password"
                            disabled={isloading}
                          />
                        </FormControl>  
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
              </div>
              {success && <FormSuccess message={success} />}
              {error && <FormError message={error} />}
              <Button
                disabled={isloading}
                type="submit"
                className=''
              >
                Save
              </Button>
            
            </form>
          </Form>
        </CardContent>
     </Card>
    </div>
  )
}

export default Settings