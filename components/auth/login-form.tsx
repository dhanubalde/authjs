import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
import Social from './social'

const LoginForm = () => {
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
    
        <form action="">
          <div className=' space-y-4'>
          <div className=''>
          <Label className="block text-[12px] font-medium text-neutral-600 dark:text-neutral-300">
            Email
          </Label>
          <Input
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            type="email"
            name="email"
            placeholder='johndoe@gmail.com'
            required
            />
          </div>
        
          <div className=''>
          <Label className="block text-[12px] font-medium text-neutral-600 dark:text-neutral-300">
            Password
          </Label>
          <Input
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            type="password"
            name="password"
            placeholder='**********'
            required
            />
            </div>
            <div>
              <Button className='w-full'> Sign in &rarr;</Button>
            </div>
            <p className="text-slate-500 text-[13px] max-w-sm mt-2 dark:text-neutral-300">
          Doesn &apos;t have an account? <Link href="/auth/register" className=' font-semibold ml-2️ underline'>register</Link>
            </p>
          </div>
          <Social/>
      </form>
      </div>
    </div>
  )
}

export default LoginForm