"use client"
import * as z from "zod"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react";
import { useForm} from "react-hook-form"
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { login } from "@/actions/login";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import Social from "./social";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";



const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? `Email Already in use with different 'Providers'` : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isloading, startTransition] = useTransition();


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {

      login(values, callbackUrl)
        .then((data) => {
          if (data.error) {
            form.reset()
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success)
          }
        }).catch((error) => { 
          toast({
            title: "Error",
            description: "Something went wrong!",
            variant: "destructive",
            duration: 5000
          });
        })
    });

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
           
        <form onSubmit={form.handleSubmit(onSubmit)} className=' flex flex-col justify-center space-y-6'>
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' text-muted-foreground text-[12px]'>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          )}

            
      {!showTwoFactor && (
        <>
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=' text-muted-foreground text-[12px]'>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={ isloading}
                  placeholder="johnDoe@gmail.com" {...field} />
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
                  <FormLabel className=' text-muted-foreground text-[12px]'>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      {...field}
                      disabled={isloading}
                      type='password'
                    />
                  </FormControl>
                  <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal text-[12px]"
                        >
                          <Link href="/auth/reset">
                            Forgot password?
                          </Link>
                        </Button>
                        <FormMessage />
                </FormItem>
              )}
            />
            </>
          )}
            {success && <FormSuccess message={success} />}
            {error && <FormError message={error || urlError} />}
            <Button
              type="submit"
              disabled={isloading}
            >
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </form>
          
        </Form>
        <p className="text-slate-500 text-[13px] max-w-sm mt-2 dark:text-neutral-300">
          Doesn&apos;t have an account? <Link href="/auth/register" className=' font-semibold ml-2️ underline'>register</Link>
            </p>
        <Social/>
      </div>
    </div>
  )
}

export default LoginForm