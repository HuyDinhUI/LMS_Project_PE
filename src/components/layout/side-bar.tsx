import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  PawPrint,
} from "lucide-react";
import logo from "@/assets/logo_cat.svg"
import { Button } from "../ui/button";


export type SidebarItem =
  | {
    type: 'item',
    label: string;
    icon?: ReactNode;
    href?: string;
    subItems?: SidebarItem[];
  }
  |
  {
    type: 'separator';
    label?: string;
  };

type SidebarVariant = "default" | "primary" 


type SidebarItemProps = {
  items: SidebarItem[]
  variant?: SidebarVariant
  ishidden?: boolean
}

const SidebarVariantOption = {
  primary: "bg-[#0c0f0a] h-full",
  default: "h-[90vh]"

}


export const Sidebar = ({items, variant = 'primary',ishidden = false}:SidebarItemProps) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(ishidden)

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isMenuOpen = (label: string) => openMenus.includes(label);

  

  return (
    <aside className={`xl:block hidden shadow-md ${isHidden ? 'w-20' : 'w-60'} ${SidebarVariantOption[variant]} sticky px-4 py-4 space-y-2 text-white rounded-2xl transition-all duration-150`}>
      <div className="flex items-center justify-center mt-5 mb-5">
        <img width={40} src={logo} className="mb-5"></img>
        {!isHidden && <h1 className={`font-brand-logo text-5xl`}>eduCat</h1>}
      </div>
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return item.label ? (
            <div key={index} className="px-3 py-1 text-xs text-gray-300 tracking-wide">
              {isHidden ? '' : item.label}
            </div>
          ) : (
            <div key={index} className="my-3" />
          );
        }

        const isActive = item.href === location.pathname ? true : false
        const hasSub = item.subItems && item.subItems.length > 0;

        return (
          <div key={item.label} className="transition-all">
            <button
              onClick={() => hasSub && toggleMenu(item.label)}
              className={`cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-full transition ${isActive && !isHidden ? "bg-yellow-brand text-white py-2" : ""
                } ${isActive && isHidden ? "bg-yellow-brand rounded-full text-white p-3 hover:bg-yellow-brand/30" : ""
                }`}
            >
              <span className={`flex-1 ${isHidden ? 'text-4xl' : 'text-sm'}`}>
                
                {item.href ? (
                  <Link to={item.href} className="w-full flex items-center gap-2 text-left">
                    {item.icon} {isHidden ? '' : item.label}</Link>
                ) : (
                  <span>{isHidden ? '' : item.label}</span>
                )}
              </span>
              {hasSub &&
                (isMenuOpen(item.label) ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                ))}
            </button>

            {/* Submenu */}
            {hasSub && isMenuOpen(item.label) && (
              <div className="mt-1 space-y-1 w-full">
                {item.subItems!.map((sub) => {
                  if (sub.type === 'separator') {
                    return item.label ? (
                      <div key={index} className="px-3 py-1 text-gray-500 uppercase tracking-wide">
                        {item.label}
                      </div>
                    ) : (
                      <div key={index} className="my-3" />
                    );
                  }
                  const isSubActive = location.pathname === sub.href;
                  return (
                    <Link
                      key={sub.label}
                      to={sub.href!}
                      className={`flex items-center gap-2 ps-10 px-2 py-2 rounded-full ${isHidden ? 'text-4xl' : 'text-md'} ${isSubActive ? "ms-3 border-l text-gray-400" : ""
                        }`}
                    >
                      {sub.icon}
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      <Button onClick={() => setIsHidden(!isHidden)} variant="icon" size="ic" icon={isHidden ? <PawPrint size={15}/> : <PawPrint size={15} className='-rotate-90'/>} className="absolute -right-3 top-25"/>
    </aside>
  );
};
