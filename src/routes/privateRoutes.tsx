import MainLayout from "@/layouts/mainLayout";
import {
  SidebarAdminData,
  SidebarStudentData,
  SidebarTeacherData,
} from "@/mock/sidebar-data";
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

const ListStudentPage = lazy(
  () => import("@/pages/StudentManagement/ListStudent")
);

const StudentDashboardPage = lazy(
  () => import("@/pages/Student/StudentDashboard")
);

const StudentSchedulePage = lazy(
  () => import("@/pages/Student/StudentSchedule")
);

const StudentEnrollClassCoursePage = lazy(
  () => import("@/pages/Student/StudentEnrollClassCourse")
);

const StudentInformationPage = lazy(
  () => import("@/pages/Student/StudentInformation")
);

const StudentGradesPage = lazy(() => import("@/pages/Student/StudentGrades"))
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

  {
    path: "/studentmanagement/liststudent",
    element: (
      <MainLayout sidebarItems={SidebarAdminData}>
        <ListStudentPage />
      </MainLayout>
    ),
  },

  /////////////  Teacher  ////////////////

  {
    path: "/teacher/information/update",
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

  /////////////  Student  ////////////////

  {
    path: "/student/dashboard",
    element: (
      <Guard>
        <MainLayout sidebarItems={SidebarStudentData}>
          <StudentDashboardPage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/student/information/update",
    element: (
      <Guard>
        <MainLayout sidebarItems={SidebarStudentData}>
          <StudentInformationPage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/student/courses/enroll",
    element: (
      <Guard>
        <MainLayout sidebarItems={SidebarStudentData}>
          <StudentEnrollClassCoursePage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/student/schedule",
    element: (
      <Guard>
        <MainLayout sidebarItems={SidebarStudentData}>
          <StudentSchedulePage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/student/grades",
    element: (
      <Guard>
        <MainLayout sidebarItems={SidebarStudentData}>
          <StudentGradesPage />
        </MainLayout>
      </Guard>
    ),
  },
];
