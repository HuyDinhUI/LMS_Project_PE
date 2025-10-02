import MainLayout from "@/layouts/mainLayout";
import { SidebarAdminData, SidebarTeacherData } from "@/mock/sidebar-data";
import Guard from "@/routes/guard";

import { lazy } from "react";

const ListTeacherPage = lazy(
  () => import("@/pages/TeacherManagement/ListTeacher")
);
const ScheduleTeacherPage = lazy(
  () => import("@/pages/TeacherManagement/ScheduleTeacher")
);
const ListCoursePage = lazy(
  () => import("@/pages/CourseManagement/ListCourse")
);
const ListClassCoursePage = lazy(
  () => import("@/pages/ClassCourseManagement/ListClassCourse")
);
const ListSchedulePage = lazy(
  () => import("@/pages/ScheduleManagement/ListSchedule")
);

const TeacherInformationPage = lazy(
  () => import("@/pages/Teacher/TeacherInformation")
);
const TeacherDashboardPage = lazy(
  () => import("@/pages/Teacher/TeacherDashboard")
);

const TeacherSchedulePage = lazy(
  () => import("@/pages/Teacher/TeacherSchedule")
);

export const privateRoutes = [
  /////////////  Admin  /////////////////
  {
    path: "/teachermanagement/listteacher",
    element: (
      <MainLayout sidebarItems={SidebarAdminData}>
        <ListTeacherPage />
      </MainLayout>
    ),
  },
  {
    path: "/teachermanagement/schedules",
    element: (
      <MainLayout sidebarItems={SidebarAdminData}>
        <ScheduleTeacherPage />
      </MainLayout>
    ),
  },
  {
    path: "/coursemanagement/listcourse",
    element: (
      <MainLayout sidebarItems={SidebarAdminData}>
        <ListCoursePage />
      </MainLayout>
    ),
  },
  {
    path: "/classcoursemanagement/listclasscourse",
    element: (
      <MainLayout sidebarItems={SidebarAdminData}>
        <ListClassCoursePage />
      </MainLayout>
    ),
  },
  {
    path: "/schedulemanagement/listschedule",
    element: (
      <MainLayout sidebarItems={SidebarAdminData}>
        <ListSchedulePage />
      </MainLayout>
    ),
  },

  /////////////  Teacher  ////////////////

  {
    path: "/teacher/information",
    element: (
      <Guard>
        <MainLayout sidebarItems={SidebarTeacherData}>
          <TeacherInformationPage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/teacher/dashboard",
    element: (
      <Guard>
        <MainLayout sidebarItems={SidebarTeacherData}>
          <TeacherDashboardPage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/teacher/schedule",
    element: (
      <Guard>
        <MainLayout sidebarItems={SidebarTeacherData}>
          <TeacherSchedulePage />
        </MainLayout>
      </Guard>
    ),
  },
];
