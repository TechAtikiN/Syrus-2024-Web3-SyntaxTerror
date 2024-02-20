import React from "react";
import {
  FileText,
  MessageSquareText,
  Calendar,
  Users,
  LayoutDashboard,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/router";

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


  // {
  //   icon: Calendar,
  //   label: "Meetings",
  //   href: "/lawyer/meetings",
  // },
  // {
  //   icon: Users,
  //   label: "My Profile",
  //   href: "/lawyer/my-profile",
  // },
];

const courtRoutes = [
  {
    icon: FileText,
    label: "Cases",
    href: "/court/cases",
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
