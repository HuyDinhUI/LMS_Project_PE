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
  { type: "item", label: "Trang chủ", icon: <Home size={18} />, href: "/" },
  { type: "separator", label: "Người dùng" },
  {
    type: "item",
    label: "Quản lý giảng viên",
    icon: <SquareKanban size={18} />,
    href: '#',
    subItems: [
      { type: "item", label: "Quản lý hồ sơ giảng viên", href: "/teachermanagement/listteacher" },
      { type: "item", label: "Quản lý lịch dạy", href: "/teachermanagement/schedules" },
    ]
  },
  {
    type: "item",
    label: "Quản lý sinh viên",
    icon: <LayoutDashboard size={18} />,
    subItems: [
      { type: "item", label: "Quản lý hồ sơ sinh viên", href: "#" },
      { type: "item", label: "Quản lý điểm", href: "#" },
    ],
  },
  
  { type: "separator" },
  { type: "separator", label: "Tài khoản" },
  {
    type: "item",
    label: "Quản lý tài khoản",
    icon: <Rocket size={18} />,
    subItems: [
      {
        type: "item",
        label: "Quản lý tài khoản sinh viên",
        href: "#",
        icon: <LayoutDashboard size={18} />,
      },
      {
        type: "item",
        label: "Quản lý tài khoản giảng viên",
        href: "#",
        icon: <Settings size={18} />,
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
