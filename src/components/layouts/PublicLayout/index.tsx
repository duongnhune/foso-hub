import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FunctionComponent = () => {
  return (
    <>
      <div className="main-content">
        <div className="main-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PublicLayout;
