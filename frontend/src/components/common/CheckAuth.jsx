import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (
      !isAuthenticated &&
      !location.pathname.includes("/login") &&
      !location.pathname.includes("/register")
    ) {
      navigate("/auth/login");
    }

    // Redirect authenticated users away from auth pages
    if (
      isAuthenticated &&
      (location.pathname.includes("/login") ||
       location.pathname.includes("/register"))
    ) {
      if (user?.role==="admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/client/home");
      }
    }

    // Prevent non-admins from accessing admin routes
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
      navigate("/client/home");
    }

    // Prevent non-users (admins) from accessing client routes
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/client")) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, user, location.pathname, navigate]);

  return <>{children}</>;
};

export default CheckAuth;
