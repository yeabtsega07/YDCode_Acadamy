import { ModeToggle } from "@/components/ui/themeToggle";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
    return ( 
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white dark:bg-slate-950 shadow-sm">
            <div className="p-6">
                <Logo/>
            </div>
            <div className="w-full flex flex-col ">
                <SidebarRoutes/>
                </div>
        </div>

     );
}
 
export default Sidebar;