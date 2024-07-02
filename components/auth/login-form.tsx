"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useState } from 'react'
import Social from './social'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { LoginShema } from '@/schema'
import {zodResolver} from "@hookform/resolvers/zod"
import { toast } from '../ui/use-toast'


const LoginForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isloading, StartTrnasition] = useState();

  const form = useForm<z.infer<typeof LoginShema>>({
    resolver: zodResolver(LoginShema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginShema>) => { 
    setError("");
    setSuccess("");
    StartTrnasition(() => {
      setSuccess("Processing...");
    })
  
    console.log(values, toast({
      title: "Login Successfully",
      description: "You have successfully login.",
      duration: 5000,
    }));
    
  }
  return (
    <div className=' h-full flex flex-col items-center justify-center bg-gradient-to-bl from-cyan-500 to-lime-400'>
    <div className=' p-8 px-5 flex flex-col max-w-md w-full mx-auto rounded-lg  border bg-white shadow-xl '>
       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Authentication Crash
          <span className='text-3xl ml-3'>👋</span>
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-1 dark:text-neutral-300 mb-6">
        Please login your Account
      </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center space-y-2'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isloading}
                      type='email'
                      placeholder='johndoe@gmail.com'
                      {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isloading}
                      type='password'
                      placeholder='**********'
                      {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={ isloading}
            >
            Sign in
            </Button>
          </form>
        </Form>
        <p className="text-slate-500 text-[13px] max-w-sm mt-2 dark:text-neutral-300">
          Doesn &apos;t have an account? <Link href="/auth/register" className=' font-semibold ml-2️ underline'>register</Link>
        </p>
        <Social/>

      </div>
    </div>
  )
}

export default LoginForm