import React from "react";
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

import dynamic from "next/dynamic";

const ThemeChanger = dynamic(() => import("./ThemeChanger"), { ssr: false });

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto justify-between shadow-sm bg-[#F7F7F7] dark:bg-[#242528]">
      <div className="flex flex-col w-full ">
        <div className="p-8">
          <Logo />
        </div>
        <SidebarRoutes />
      </div>

      <ThemeChanger />
    </div>
  );
};

export default Sidebar;
