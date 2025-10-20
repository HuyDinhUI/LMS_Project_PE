import type { SidebarItem } from "@/components/layout/side-bar";
import {
  BookUser,
  Calendar,
  CircleUser,
  FileUser,
  GraduationCap,
  Home,
  Inbox,
  LayoutDashboard,
  Library,
  Presentation,
  Shield,
  SquareKanban,
} from "lucide-react";

export const SidebarAdminData: SidebarItem[] = [
  { type: "item", label: "Trang chủ", icon: <Home size={18} />, href: "/" },
  {
    type: "item",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    href: "/management/dashboard",
  },
  { type: "separator" },
  { type: "separator", label: "Người dùng" },
  {
    type: "item",
    label: "Quản lý giảng viên",
    icon: <SquareKanban size={18} />,
    href: "#",
    subItems: [
      {
        type: "item",
        label: "Quản lý hồ sơ giảng viên",
        href: "/teachermanagement/listteacher",
      },
      {
        type: "item",
        label: "Quản lý lịch dạy",
        href: "/teachermanagement/schedules",
      },
    ],
  },
  {
    type: "item",
    label: "Quản lý sinh viên",
    icon: <SquareKanban size={18} />,
    subItems: [
      { type: "item", label: "Quản lý hồ sơ sinh viên", href: "/studentmanagement/liststudent" },
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
    href: "/schedulemanagement/listschedule",
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

export const SidebarTeacherData: SidebarItem[] = [
  { type: "item", label: "Trang chủ", icon: <Home size={18} />, href: "/" },
  {
    type: "item",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    href: `/teacher/dashboard`,
  },
  { type: "separator" },
  {
    type: "item",
    label: "Danh sách lớp",
    icon: <Presentation size={18}/>
  },
  {
    type: "item",
    label: "Lịch dạy",
    href: "/teacher/schedule",
    icon: <Calendar size={18}/>
  },
  {
    type: "item",
    label: "Cập nhật hồ sơ",
    href: "/teacher/information/update",
    icon: <FileUser size={18}/>
  },
  {
    type: "item",
    label: "Inbox",
    href: "",
    icon: <Inbox size={18}/>
  }
];

export const SidebarStudentData: SidebarItem[] = [
  { type: "item", label: "Trang chủ", icon: <Home size={18} />, href: "/" },
  {
    type: "item",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    href: `/student/dashboard`,
  },
  { type: "separator" },
  {
    type: "item",
    label: "Danh sách lớp học",
    icon: <BookUser size={18}/>
  },
  {
    type: "item",
    label: "Lịch học",
    href: "/student/schedule",
    icon: <Calendar size={18}/>
  },
  {
    type: "item",
    label: "Đăng ký học phần",
    href: "/student/courses/enroll",
    icon: <Library size={18}/>
  },
  {
    type: "item",
    label: "Cập nhật hồ sơ",
    href: "/student/information/update",
    icon: <BookUser size={18}/>
  },
  {
    type: "item",
    label: "Inbox",
    href: "",
    icon: <Inbox size={18}/>
  }
];
