import Header from "@/components/layout/header";
import { Sidebar, type SidebarItem } from "@/components/layout/side-bar";
import { slugtify } from "@/utils/formatters";
import {
  LayoutDashboard,
  Settings,
  SquareKanban,
  Home,
  Users2,
  CreditCard,
  Rocket,
} from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const sidebarItems: SidebarItem[] = [
  { type: "item", label: "Home", icon: <Home size={18} />, href: "/" },
  { type: "separator", label: "User" },
  {
    type: "item",
    label: "Teacher Management",
    icon: <SquareKanban size={18} />,
    href: '#',
    subItems: [
      { type: "item", label: "List Teachers", href: "/teachermanagement/listteacher" },
      { type: "item", label: "Schedules", href: "/teachermanagement/schedules" },
    ]
  },
  {
    type: "item",
    label: "Student Management",
    icon: <LayoutDashboard size={18} />,
    subItems: [
      { type: "item", label: "List Students", href: "#" },
      { type: "item", label: "List Grades", href: "#" },
    ],
  },
  
  { type: "separator" },
  { type: "separator", label: "Account" },
  {
    type: "item",
    label: "Account Management",
    icon: <Rocket size={18} />,
    subItems: [
      {
        type: "item",
        label: "Boards",
        href: "#",
        icon: <LayoutDashboard size={18} />,
      },
      { type: "item", label: "Members", href: "#", icon: <Users2 size={18} /> },
      {
        type: "item",
        label: "Settings",
        href: "#",
        icon: <Settings size={18} />,
      },
      {
        type: "item",
        label: "Billing",
        href: "#",
        icon: <CreditCard size={18} />,
      },
    ],
  },
];

const MainLayout = ({ children }: Props) => {
  return (
    <div className="wrapper h-full dark:bg-background">
      <Header/>
      <div className="flex overflow-y-scroll max-h-[90vh] pt-5">
        <Sidebar items={sidebarItems} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
