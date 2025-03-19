import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientHeader from './ClientHeader'

const ClientLayout = () => {
  return (
    <div className=' flex flex-col bg-white overflow-hidden'>
        {/* common header component */}
        <ClientHeader/>
        <main className='flex flex-col w-full'>
            <Outlet/>
        </main>

    </div>
  )
}

export default ClientLayout