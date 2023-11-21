import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
    return ( 
        <div className="p-4  border-b bg-white h-full flex items-center dark:bg-slate-950 shadow-sm">
            <MobileSidebar/>
            <NavbarRoutes/>
        </div>
     );
}
 
export default Navbar;