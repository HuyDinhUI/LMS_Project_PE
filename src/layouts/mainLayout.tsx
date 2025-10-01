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
  FileUser,
  CircleUser,
  Shield,
  BookUser,
  Presentation,
  Clipboard,
  Calendar,
} from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const sidebarItems: SidebarItem[] = [
  { type: "item", label: "Trang chủ", icon: <Home size={18} />, href: "/" },
  { type: "item", label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/" },
  { type: "separator" },
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
    icon: <SquareKanban size={18} />,
    subItems: [
      { type: "item", label: "Quản lý hồ sơ sinh viên", href: "#"},
      { type: "item", label: "Quản lý điểm", href: "#" },
    ],
  },

  { type: "separator" },
  { type: "separator", label: "Đào tạo" },

  {
    type: "item",
    label: "Quản lý học phần",
    href: "/coursemanagement/listcourse",
    icon: <BookUser size={18} />,
  },
  {
    type: "item",
    label: "Quản lý lớp học phần",
    href: "/classcoursemanagement/listclasscourse",
    icon: <Presentation size={18} />,
  },

  {
    type: "item",
    label: "Danh sách lịch dạy & học",
    icon: <Calendar size={18} />,
  },
  
  { type: "separator" },
  { type: "separator", label: "Tài khoản" },
  {
    type: "item",
    label: "Quản lý tài khoản giảng viên",
    icon: <CircleUser size={18} />,
  },
  {
    type: "item",
    label: "Quản lý tài khoản sinh viên",
    icon: <CircleUser size={18} />,
  },
  
  { type: "separator" },
  { type: "separator", label: "Quyền" },
  {
    type: "item",
    label: "Danh sách quyền",
    icon: <Shield size={18} />,
  },
];

const MainLayout = ({ children }: Props) => {
  return (
    <div className="wrapper h-full dark:bg-background">
      <Header/>
      <div className="flex max-h-[95vh]">
        <Sidebar items={sidebarItems} />
        <div className="bg-gray-50 p-4 flex-1 h-[92vh]">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
