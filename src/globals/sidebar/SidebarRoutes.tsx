import { useRouter } from "next/router";
import {
  FileText,
  MessageSquareText,
  Users,
  LayoutDashboard,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const lawyerRoutes = [
  {
    icon: FileText,
    label: "AI Summarizer",
    href: "/lawyer/ai-summarizer",
  },
  {
    icon: Users,
    label: "View Cases",
    href: "/lawyer/cases",
  },

  {
    icon: MessageSquareText,
    label: "AI Judge",
    href: "/lawyer/ai-judge",
  },
];

const courtRoutes = [
  {
    icon: LayoutDashboard,
    label: "Cases",
    href: "/court/cases",
  },
  {
    icon: FileText,
    label: "Create Case",
    href: "/court/cases/create",
  }
];


const SidebarRoutes = () => {
  const router = useRouter();
  const { pathname } = router;

  const routes = pathname.startsWith("/lawyer") ? lawyerRoutes : pathname.startsWith("/court") ? courtRoutes : [];

  return (
    <div className="flex flex-col w-full gap-2 px-2">
      {/* <SidebarItem key="/" icon={LayoutDashboard} label="Dashboard" href="/" /> */}
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
