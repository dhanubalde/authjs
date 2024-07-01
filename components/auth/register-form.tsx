
 "use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'


const RegisterForm = () => {
  return (
    <div className=' h-full flex flex-col items-center justify-center'>
    <div className=' mt-20 p-8 px-5 flex flex-col max-w-lg w-full mx-auto rounded-lg  border bg-white shadow-xl '>
       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Authentication Crash
          <span className='text-3xl ml-3'>👋</span>
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-1 dark:text-neutral-300 mb-6">
        Please provide all the necessary information
        </p>
      
        <form action="">
          <div className=' space-y-4'>
          <div className=' space-y-2'>
          <Label className="block text-[12px] font-medium text-neutral-600 dark:text-neutral-300">
            First Name
          </Label>
          <Input
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            type="text"
            name="firstname"
            required
              />
                <Label className="block text-[12px] font-medium text-neutral-600 dark:text-neutral-300">
            Last Name
          </Label>
          <Input
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            type="text"
            name="lastname"
            required
            />
          </div>
        <div className=''>
          <Label className="block text-[12px] font-medium text-neutral-600 dark:text-neutral-300">
            Email address
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
            <div className=''>
              <Button className='w-full'> Sign up &rarr;</Button>
            </div>
            <p className="text-slate-500 text-[13px] max-w-sm mt-2 dark:text-neutral-300">
          Already have an account? <Link href="/auth/login" className=' font-semibold ml-2️ underline'>login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm