import React from "react";
import OpsTopNav from "@/OPS-MGMT/components/layout/Header";
import OpsFooter from "@/OPS-MGMT/components/layout/Footer";

type MainLayoutProps = {
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
  showTopNav?: boolean;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageTitle, pageSubtitle, showTopNav = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {showTopNav ? <OpsTopNav pageTitle={pageTitle} pageSubtitle={pageSubtitle} /> : null}
      <div className="flex-1">{children}</div>
      <OpsFooter />
    </div>
  );
};

export default MainLayout;

