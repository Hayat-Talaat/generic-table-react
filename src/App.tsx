import React from "react";
// components
import OrdersOverview from "./pages/OrdersOverview";
import UserManagement from "./pages/UserManagement";

const App: React.FC = () => {
  return (
    <>
      <UserManagement />
      <br />
      <br />
      <OrdersOverview />
    </>
  );
};

export default App;
