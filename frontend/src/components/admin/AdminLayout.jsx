import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const AdminLayout = () => {

  const [openSidebar, setSidebarOpen] = useState(false);

  return (
    <div className='flex min-h-screen w-full '>
        {/* admin sidebar */}
        <AdminSidebar open={openSidebar} setOpen={setSidebarOpen}/>
        <div className='flex flex-1 flex-col'>
            {/* admin header */}
            <AdminHeader setOpen={setSidebarOpen}/>
            <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>

    </div>
  )
}

export default AdminLayout