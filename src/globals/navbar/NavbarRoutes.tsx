import React from "react";
import SearchInput from "./SearchInput";
import User from "./User";

const NavbarRoutes = () => {
  return (
    <>
      <div className="hidden md:block">
        <SearchInput />
      </div>

      <div className="flex gap-x-2 ml-auto">
        <User />
      </div>
    </>
  );
};

export default NavbarRoutes;
