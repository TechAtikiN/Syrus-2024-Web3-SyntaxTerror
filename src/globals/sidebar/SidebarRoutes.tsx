import { useRouter } from "next/router";
import {
  FileText,
  MessageSquareText,
  Users,
  LayoutDashboard,
  Calendar
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const lawyerRoutes = [
  {
    icon: FileText,
    label: "AI Summarizer",
    href: "/lawyer/ai-summarizer",
  },
  {
    icon: MessageSquareText,
    label: "Scheduled Meetings",
    href: "/lawyer/meetings",
  },
  {
    icon: Users,
    label: "Settings",
    href: "/court/settings",
  },
];

const courtRoutes = [
  {
    icon: LayoutDashboard,
    label: "Cases",
    href: "/court/cases",
  },
  {
    icon: LayoutDashboard,
    label: "Create Case",
    href: "/court/cases/create",
  },
  {
    icon: Calendar,
    label: "Meetings",
    href: "/court/meetings",
  },
  {
    icon: Users,
    label: "Settings",
    href: "/court/settings",
  },
];


const SidebarRoutes = () => {
  const router = useRouter();
  const { pathname } = router;

  const routes = pathname.startsWith("/lawyer") ? lawyerRoutes : pathname.startsWith("/court") ? courtRoutes : [];

  return (
    <div className="flex flex-col w-full gap-2 px-2 gap-y-4">
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
