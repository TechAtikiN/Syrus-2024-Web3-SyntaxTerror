
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/globals/navbar/Navbar";
import Sidebar from "@/globals/sidebar/Sidebar";
import { useRouter } from "next/router";
import { ReactNode } from "react";
type Props = {
  children?: ReactNode;
};
const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { pathname } = router;
  if (pathname.startsWith("/auth") || pathname === "/") {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <>
      <div className="h-full ">
        <div className="h-[80px] md:pl-64 fixed inset-y-0 w-full z-50 bg-background">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-64 pt-[80px] h-full z-0 ">{children}</main>
        <Toaster />
      </div>

    </>
  );
};

export default Layout;
