"use client";

import { Compass, LayoutDashboard } from "lucide-react";
import SidebarItem from "./sidebar-item";

const guestRoutes = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/"
    },
    {
        icon: Compass,
        label: "Browse",
        path: "/search"
    }

];

const SidebarRoutes = () => {
    const routes = guestRoutes;
    return ( 
        <div  className="flex flex-col w-full mt-1">
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
}
 
export default SidebarRoutes;