"use client"
import { CheckCircleIcon } from 'lucide-react'
import React from 'react'
interface FormSuccess { 
  message: string
}
const FormSuccess = ({ message }: FormSuccess) => {
  if (!message) return null;
  return (
    <div className='  bg-emerald-500/10 p-3 rounded-md flex items-center gap-x-3 text-emerald-500'>
      <CheckCircleIcon className=' h-4 w-4'/>
      <p className='text-sm text-emerald-500'>{ message}</p>
    </div>
  )
}

export default FormSuccess