import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import OrdersOverview from "../pages/OrdersOverview";
import UserManagement from "../pages/UserManagement";
import WelcomePage from "../pages/WelcomePage";
import SideMenu from "../components/SideMenu";

const Layout: React.FC = () => (
  <div className="flex">
    <SideMenu />
    <div className="flex-1 p-6">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <WelcomePage /> },
      { path: "/orders", element: <OrdersOverview /> },
      { path: "/users", element: <UserManagement /> },
    ],
  },
]);

const AppRoutes: React.FC = () => <RouterProvider router={router} />;

export default AppRoutes;
