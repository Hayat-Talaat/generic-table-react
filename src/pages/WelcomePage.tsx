import React from "react";

const WelcomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        Welcome to Octane Dashboard
      </h1>
      <p className="text-gray-700">
        Manage your orders and users effortlessly.
      </p>
    </div>
  );
};

export default WelcomePage;
