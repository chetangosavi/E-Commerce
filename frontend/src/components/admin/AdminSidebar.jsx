import {  adminSidebarMenuItems } from "@/config/config";
import { ShieldUser } from "lucide-react"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"

const AdminSidebar = () => {

  const navigate = useNavigate();

  function MenuItems(){
    return <nav className="mt-8 flex-col flex gap-3">
      {
        adminSidebarMenuItems.map((item)=>{
          <div className="flex items-center agp-2 rounded-md px-3 py-2">

          </div>
        })
      }
    </nav>
  }

  return (
    <Fragment>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/admin/dashboard')}>
         <ShieldUser size={30}/>
          <h1 className="text-xl font-extrabold uppercase">Admin</h1>
        </div>
      </aside>
    </Fragment>
  )
}

export default AdminSidebar