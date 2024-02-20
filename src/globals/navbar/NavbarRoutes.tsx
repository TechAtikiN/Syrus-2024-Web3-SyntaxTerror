import React from "react";
import SearchInput from "./SearchInput";
import User from "./User";
import { useAddress } from "@thirdweb-dev/react";

const NavbarRoutes = () => {
  const address = useAddress();
  return (
    <>
      <div className="hidden md:block">
        <SearchInput />
      </div>

      <div className="flex gap-x-4 ml-auto items-center">
        {address && address.slice(0, 5) + "..." + address.slice(-4)}

        <User />
      </div>
    </>
  );
};

export default NavbarRoutes;
