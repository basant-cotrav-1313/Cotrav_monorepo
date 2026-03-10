import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import OpsMgmtProviders from "./providers";
import { opsMgmtRoutes } from "./routes";

const OpsMgmtApp: React.FC = () => {
  return (
    <OpsMgmtProviders>
      <Routes>
        {opsMgmtRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to="/ops-mgmt/login" replace />} />
      </Routes>
    </OpsMgmtProviders>
  );
};

export default OpsMgmtApp;

