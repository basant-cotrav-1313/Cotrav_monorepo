import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
