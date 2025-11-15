import type { SidebarItem } from "@/components/layout/side-bar";
import {
  Baby,
  BookUser,
  Calendar,
  ChartArea,
  CircleUser,
  GraduationCap,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Library,
  PersonStanding,
  Presentation,
  Settings,
  Shield,
} from "lucide-react";

export const SidebarAdminData: SidebarItem[] = [
  {
    type: "item",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/management/dashboard",
  },
  { type: "separator" },
  { type: "separator", label: "User" },
  {
    type: "item",
    label: "Teachers",
    icon: <PersonStanding />,
    href: "/teachermanagement/listteacher",
  },
  {
    type: "item",
    label: "Students",
    icon: <Baby />,
    href:'/studentmanagement/liststudent',
  },

  { type: "separator" },
  { type: "separator", label: "Education" },

  {
    type: "item",
    label: "Courses",
    href: "/coursemanagement/listcourse",
    icon: <BookUser />,
  },
  {
    type: "item",
    label: "Class",
    href: "/classcoursemanagement/listclasscourse",
    icon: <Presentation />,
  },

  {
    type: "item",
    label: "Schedule",
    href: "/schedulemanagement/listschedule",
    icon: <Calendar />,
  },

  { type: "separator" },
  { type: "separator", label: "Account" },
  {
    type: "item",
    label: "User account",
    href: '/accountmanagement',
    icon: <CircleUser />,
  },
  {
    type: "item",
    label: "Permission",
    href: '/',
    icon: <Shield />,
  },
];

export const SidebarTeacherData: SidebarItem[] = [
  { type: "separator", label: "General" },
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
    icon: <GraduationCap/>
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
    href: "/inbox",
    icon: <Inbox/>
  },
  { type: "separator" },
  { type: "separator",label: "Tools" },
  {
    type: "item",
    label: "Analytics",
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
    icon: <GraduationCap/>
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
    href: "/inbox",
    icon: <Inbox/>
  },
  { type: "separator" },
  { type: "separator",label: "Tools" },
  {
    type: "item",
    label: "Analytics",
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
