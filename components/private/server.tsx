"use server"

import React from 'react'
import UserInfo from '../user-info'
import { currentUser } from '@/lib/auth'

const Server = async() => {
  const user = await currentUser()
  return (
    <UserInfo
      label='Server'
      user={user}
    />
  )
}

export default Server