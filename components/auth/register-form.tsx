
"use client"
// 

import { startTransition, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Social from './social'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import {z} from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { RegisterSchema } from '@/schema'
import FormError from '../form-error'
import FormSuccess from '../form-success'
import { toast } from '../ui/use-toast'




const RegisterForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isloading, StartTrnasition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }
  })



  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    StartTrnasition(() => {
      setSuccess("Processing...");
    })
  
    console.log(values, toast({
      title: "Registration Successful",
      description: "You have successfully registered. You can now login.",
      duration: 5000,
    }));
    
  }

  return (
    <div className=' h-full flex flex-col items-center justify-center bg-gradient-to-bl from-cyan-500 to-lime-400'>
    <div className='p-8 px-5 flex flex-col max-w-md w-full mx-auto rounded-lg  border bg-white shadow-xl '>
       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Authentication Crash
          <span className='text-3xl ml-3'>👋</span>
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-1 dark:text-neutral-300 mb-6">
        Please provide all the necessary information
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=' flex flex-col justify-center space-y-2'>
          <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
            />
          <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="" {...field}
                      disabled={isloading}
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      disabled={isloading}
                      type='email'
                    />
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
                      placeholder="**********"
                      {...field}
                      disabled={isloading}
                      type='password'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isloading}
            >
          
              Sign up
            </Button>
          </form>
          
        </Form>
        <p className="text-slate-500 text-[13px] max-w-sm mt-2 dark:text-neutral-300">
          Already have an account? <Link href="/auth/login" className=' font-semibold ml-2️ underline'>login</Link>
            </p>
        <Social/>
      </div>
    </div>
  )
}

export default RegisterForm

