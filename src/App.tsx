import React from "react";
import AppRoutes from "./routes";
import Notification from "./components/Notification";

const App: React.FC = () => {
  return (
    <>
      <Notification />
      <AppRoutes />
    </>
  );
};

export default App;
