"use client"

import React from 'react'
import UserInfo from '../user-info'
import { useCurrentUser } from '@/hooks/use-current-user'

const Client =  () => {

  const user = useCurrentUser()
  return (
    <>
      <UserInfo
        label='Client Component'
        user= {user}
      />
    </>
  )
}

export default Client