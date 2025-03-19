import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center bg-black justify-center w-1/2 ">
        <div className="relative text-center text-primary-foreground bg-emerald-700 w-full h-full bg-[url(https://images.unsplash.com/photo-1726066012593-3175a0c4e9b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
          <div className="max-w-2xl absolute bottom-48 right-14 text-right ">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
            UrbanCart – Shop Smart, Live Stylish!
            </h1>
            <p>Your one-stop destination for trendy fashion, electronics, and more. Shop effortlessly with the best deals and fast delivery!</p>
          </div>
        </div>
      </div>
      {/* Rendering all common components/ childrens */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
