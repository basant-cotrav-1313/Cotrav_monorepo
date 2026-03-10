import React from "react";
import OpsTopNav from "@/OPS-MGMT/components/layout/Header";

type MenuProps = {
  pageTitle?: string;
  pageSubtitle?: string;
};

const Menu: React.FC<MenuProps> = ({ pageTitle, pageSubtitle }) => {
  return <OpsTopNav pageTitle={pageTitle} pageSubtitle={pageSubtitle} />;
};

export default Menu;

