"use client"

import React from 'react'
import CardWrapper from './card-wrapper'
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
const ErrorCard = () => {
  return (
    <div className='h-full flex items-center justify-center  bg-gradient-to-bl from-cyan-500 to-lime-400'>
    <CardWrapper
      headerLabel='Oops Something went wrong'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <div className="w-full flex justify-center items-center">
      <ExclamationTriangleIcon className="text-destructive " height="100" width="100"/>
      </div>
      </CardWrapper>
    </div>
  )
}

export default ErrorCard