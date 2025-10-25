import type { SidebarItem } from "@/components/layout/side-bar";
import {
  BookUser,
  Calendar,
  ChartArea,
  CircleUser,
  FileUser,
  GraduationCap,
  HelpCircle,
  Home,
  Inbox,
  LayoutDashboard,
  Library,
  Presentation,
  Settings,
  Shield,
  SquareKanban,
} from "lucide-react";

export const SidebarAdminData: SidebarItem[] = [
  { type: "item", label: "Trang chủ", icon: <Home />, href: "/" },
  {
    type: "item",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/management/dashboard",
  },
  { type: "separator" },
  { type: "separator", label: "Người dùng" },
  {
    type: "item",
    label: "Quản lý giảng viên",
    icon: <SquareKanban />,
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
    icon: <SquareKanban />,
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
    icon: <BookUser />,
  },
  {
    type: "item",
    label: "Quản lý lớp học phần",
    href: "/classcoursemanagement/listclasscourse",
    icon: <Presentation />,
  },

  {
    type: "item",
    label: "Danh sách lịch dạy & học",
    href: "/schedulemanagement/listschedule",
    icon: <Calendar />,
  },

  { type: "separator" },
  { type: "separator", label: "Tài khoản" },
  {
    type: "item",
    label: "Quản lý tài khoản giảng viên",
    icon: <CircleUser />,
  },
  {
    type: "item",
    label: "Quản lý tài khoản sinh viên",
    icon: <CircleUser />,
  },

  { type: "separator" },
  { type: "separator", label: "Quyền" },
  {
    type: "item",
    label: "Danh sách quyền",
    icon: <Shield />,
  },
];

export const SidebarTeacherData: SidebarItem[] = [
  { type: "separator", label: "General" },
  { type: "item", label: "Home", icon: <Home />, href: "/" },
  {
    type: "item",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: `/teacher/dashboard`,
  },
  {
    type: "item",
    label: "Course",
    href: "/classcourse/list",
    icon: <Presentation/>
  },
  {
    type: "item",
    label: "Schedule",
    href: "/teacher/schedule",
    icon: <Calendar/>
  },
  {
    type: "item",
    label: "Inbox",
    href: "/",
    icon: <Inbox/>
  },
  { type: "separator" },
  { type: "separator",label: "Tools" },
  {
    type: "item",
    label: "Statistical",
    href: "/",
    icon: <ChartArea/>
  },
  {
    type: "item",
    label: "Setting",
    href: "/",
    icon: <Settings/>
  },
  {
    type: "item",
    label: "Help center",
    href: "/",
    icon: <HelpCircle/>
  },
];

export const SidebarStudentData: SidebarItem[] = [
  { type: "separator",label: "General" },
  { type: "item", label: "Trang chủ", icon: <Home />, href: "/" },
  {
    type: "item",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: `/student/dashboard`,
  },
  {
    type: "item",
    label: "Course",
    href: "/classcourse/list",
    icon: <Presentation/>
  },
  {
    type: "item",
    label: "Schedule",
    href: "/student/schedule",
    icon: <Calendar/>
  },
  {
    type: "item",
    label: "Enroll",
    href: "/student/courses/enroll",
    icon: <Library/>
  },
  {
    type: "item",
    label: "Inbox",
    href: "",
    icon: <Inbox/>
  },
  { type: "separator" },
  { type: "separator",label: "Tools" },
  {
    type: "item",
    label: "Statistical",
    href: "",
    icon: <ChartArea/>
  },
  {
    type: "item",
    label: "Setting",
    href: "",
    icon: <Settings/>
  },
  {
    type: "item",
    label: "Help center",
    href: "",
    icon: <HelpCircle/>
  },
];
