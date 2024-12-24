import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';

const UsersLayout = async ({children}: {children: React.ReactNode}) => {
  return (
    <Sidebar>
    <div className="h-full">{children}</div>
    </Sidebar>
)
}

export default UsersLayout;