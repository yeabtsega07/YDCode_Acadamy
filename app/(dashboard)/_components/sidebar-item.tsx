"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: any;
  label: string;
  path: string;
}

const SidebarItem = ({ icon: Icon, label, path }: SidebarItemProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive =
    (pathName === "/" && path == "/") ||
    pathName === path ||
    pathName?.startsWith(path);

  const handleOnClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleOnClick}
      type="button"
      className={cn("flex items-center gap-x-2 jtext-slate-500 test-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
      isActive && "bg-sky-200/20 text-sky-800 hover:bg-sky-200/20 hover:text-sky-700" )}>
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-sky-700"
                    )}
                />
                {label}
            </div>

    </button>
  );
};

export default SidebarItem;
