import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AuthLayout from "./components/auth/AuthLayout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminFeatures from "./pages/Admin/AdminFeatures";
import ClientLayout from "./components/client/ClientLayout";
import NotFound from "./pages/NotFound/NotFound";
import ClientHome from "./pages/Client/ClientHome";
import ClientProductList from "./pages/Client/ClientProductList";
import ClientCheckout from "./pages/Client/ClientCheckout";
import ClientAccount from "./pages/Client/ClientAccount";
import CheckAuth from "./components/common/CheckAuth";

const App = () => {
  const isAuthenticated = false;
  const user ={
    name:'chetan',
    role:'user'
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          {/* auth child routes */}
          <Route path="login" element={<Login />} />
          <Route
            path="register"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Register />
              </CheckAuth>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          {/* admin child routes */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/client"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ClientLayout />
            </CheckAuth>
          }
        >
          {/* client child routes */}
          <Route path="home" element={<ClientHome />} />
          <Route path="product" element={<ClientProductList />} />
          <Route path="checkout" element={<ClientCheckout />} />
          <Route path="account" element={<ClientAccount />} />
        </Route>

        {/* Route for all other routes - page not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
