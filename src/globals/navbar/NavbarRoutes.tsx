import React from "react";
import SearchInput from "./SearchInput";
import User from "./User";
import { ConnectWallet, Web3Button, useAddress, useLogout } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const NavbarRoutes = () => {
  const address = useAddress();
  const { logout, isLoading } = useLogout();
  const router = useRouter();
  return (
    <>
      <div className="hidden md:block">
        <SearchInput />
      </div>

      <div className="flex gap-x-4 ml-auto items-center">
        {/* {address && address.slice(0, 5) + "..." + address.slice(-4)} */}

        {/* <User /> */}
        {address ? (
          <Button 
          onClick={() => {
            logout()
            Cookies.remove("role")
            router.push("/auth/login")
            
          }}

            disabled={isLoading} 
            className="border bg-transparent text-primary hover:text-white border-primary"
          >
          {isLoading ? "Logging out..." : "Logout"}
          </Button>
        ) : (
          <p>{address && address.slice(0, 5) + "..." + address.slice(-4)}</p>
        )}
      </div>
    </>
  );
};

export default NavbarRoutes;
