"use client"
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import React from 'react'
interface FormErrorProps {
  message: string
  show?: boolean;

}

const FormError = ({ message}: FormErrorProps) => {
  return (
    <div className=' bg-destructive/10 p-3 rounded-md flex items-center gap-x-3 text-sm text-destructive'>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <p className="text-sm text-red-500">
        {message}
      </p>
    </div>
  )
}

export default FormError