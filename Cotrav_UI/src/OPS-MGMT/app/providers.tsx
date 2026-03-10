import React from "react";

type OpsMgmtProvidersProps = {
  children: React.ReactNode;
};

const OpsMgmtProviders: React.FC<OpsMgmtProvidersProps> = ({ children }) => {
  return <>{children}</>;
};

export default OpsMgmtProviders;

