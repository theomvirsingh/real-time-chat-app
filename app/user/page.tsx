"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const User = () => {
  return (
    <div>
        <button onClick={() => signOut()}>Log Out</button>
    </div>
  )
}

export default User