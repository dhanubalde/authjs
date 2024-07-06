import React from 'react'
import Navbar from './_components/navbar';
interface PrivateLayoutProps { 
  children: React.ReactNode;
}

const PrivateLayout = ({ 
  children
}: PrivateLayoutProps) => {
  return (
    <div className=' h-full flex flex-col items-center w-full bg-gradient-to-bl from-cyan-500 to-lime-400'>
        <Navbar/>
       { children}
    </div>
  )
}

export default PrivateLayout