import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const router = useRouter();
  const { pathname } = router;

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(href + "/");

  const onClick = () => {
    router.push(href);
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all rounded-xl  hover:text-primary cursor-pointer
        
        ${isActive ? " text-primary font-bold" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} />
        {label}
      </div>
      {/* <div
        className={`ml-auto opacity-0 border-2 border-green-700 h-full transition-all ${
          isActive ? "opacity-100" : ""
        }`}
      /> */}
    </Link>
  );
};

export default SidebarItem;
