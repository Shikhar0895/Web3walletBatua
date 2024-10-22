import { Toaster } from "@/ui/components/toaster";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
