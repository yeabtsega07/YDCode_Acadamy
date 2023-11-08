"use client";

import {
  BarChartHorizontal,
  Compass,
  LayoutDashboard,
  Presentation,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    path: "/search",
  },
];

const teacherRoutes = [
  {
    icon: Presentation,
    label: "Courses",
    path: "/teacher/courses",
  },
  {
    icon: BarChartHorizontal,
    label: "Analytics",
    path: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname.startsWith("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full mt-1">
      {routes.map((route, index) => (
        <SidebarItem
          key={index}
          icon={route.icon}
          label={route.label}
          path={route.path}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
