import { ShieldUser } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, PackageSearch, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSidebar = ({open,setOpen}) => {
  const navigate = useNavigate();

  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <PackageSearch />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <ShoppingBasket />,
    },
  ];

  function MenuItems() {
    return (
      <nav className="mt-8 flex-col flex gap-3">
        {adminSidebarMenuItems.map((item) => (
          <div
            key={item.id}
            onClick={() =>{ navigate(item.path); setOpen(false)}}
            className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground transition ease-in hover:bg-muted hover:text-foreground"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    );
  }

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-3">
                <ShieldUser size={30} />
                Admin 
              </SheetTitle>
            </SheetHeader>
            <MenuItems/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ShieldUser size={30} />
          <h1 className="text-xl font-extrabold uppercase">Admin</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
