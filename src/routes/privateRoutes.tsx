import ClassLayout from "@/layouts/classLayout";
import MainLayout from "@/layouts/mainLayout";
import {
  SidebarAdminData,
  SidebarStudentData,
  SidebarTeacherData,
} from "@/mock/sidebar-data";
import Guard from "@/routes/guard";
import path from "path";
import { lazy } from "react";

const AttendancePage = lazy(() => import("@/pages/Attendance"));
const ListTeacherPage = lazy(
  () => import("@/pages/admin/TeacherManagement/ListTeacher")
);
const ScheduleTeacherPage = lazy(
  () => import("@/pages/admin/TeacherManagement/ScheduleTeacher")
);
const ListCoursePage = lazy(
  () => import("@/pages/admin/CourseManagement/ListCourse")
);
const ListClassCoursePage = lazy(
  () => import("@/pages/admin/ClassCourseManagement/ListClassCourse")
);
const ListSchedulePage = lazy(
  () => import("@/pages/admin/ScheduleManagement/ListSchedule")
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
  () => import("@/pages/admin/StudentManagement/ListStudent")
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

const StudentGradesPage = lazy(() => import("@/pages/Student/StudentGrades"));

const ClassCourseManagementAssignmentPage = lazy(
  () => import("@/pages/ClassCourse/ClassCourseAssignment")
);

const ClassCourseManagementHomePage = lazy(
  () => import("@/pages/ClassCourse/ClassCourseHome")
);

const ClassCourseAssignmentSubmitedPage = lazy(
  () => import("@/pages/ClassCourse/ClassCourseAssignmentSubmited")
);

const ClassCourseAssignmentGuidance = lazy(
  () => import("@/pages/ClassCourse/ClassCourseAssignmentGuidance")
);

const ClassCourseManagementGrades = lazy(
  () => import("@/pages/ClassCourse/ClassCourseGrades")
);

const ClassCourseAssignmentQuiz = lazy(
  () => import("@/pages/ClassCourse/ClassCourseQuiz")
);

const ClassCourseAssignmentQuizPlay = lazy(
  () => import("@/pages/ClassCourse/ClassCoursePlayQuiz")
)

const ClassCourseQuizSubmissionsPage = lazy(() => import("@/pages/ClassCourse/ClassCourseQuizSubmited"))

const ClassCourseListPage = lazy(() => import("@/pages/ClassCourse/ClassCourseList"))

const ClassCourseMembersPage = lazy(() => import("@/pages/ClassCourse/ClassCourseMembers"))

export const privateRoutes = [
  /////////////  Admin  /////////////////
  {
    path: "/teachermanagement/listteacher",
    element: (
      <MainLayout>
        <ListTeacherPage />
      </MainLayout>
    ),
  },
  {
    path: "/teachermanagement/schedules",
    element: (
      <MainLayout>
        <ScheduleTeacherPage />
      </MainLayout>
    ),
  },
  {
    path: "/coursemanagement/listcourse",
    element: (
      <MainLayout>
        <ListCoursePage />
      </MainLayout>
    ),
  },
  {
    path: "/classcoursemanagement/listclasscourse",
    element: (
      <MainLayout>
        <ListClassCoursePage />
      </MainLayout>
    ),
  },
  {
    path: "/schedulemanagement/listschedule",
    element: (
      <MainLayout>
        <ListSchedulePage />
      </MainLayout>
    ),
  },

  {
    path: "/studentmanagement/liststudent",
    element: (
      <MainLayout>
        <ListStudentPage />
      </MainLayout>
    ),
  },

  /////////////  Teacher  ////////////////

  {
    path: "/teacher/information",
    element: (
      <Guard>
        <MainLayout>
          <TeacherInformationPage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/teacher/dashboard",
    element: (
      <Guard>
        <MainLayout>
          <TeacherDashboardPage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/teacher/schedule",
    element: (
      <Guard>
        <MainLayout>
          <TeacherSchedulePage />
        </MainLayout>
      </Guard>
    ),
  },

  /////////// ClassCourseManagement //////////////

  {
    path: "/classcourse/list",
    element: (
      <Guard>
        <MainLayout>
          <ClassCourseListPage/>
        </MainLayout>
      </Guard>
    )
  },

  {
    path: "/classcourse/:id",
    element: (
      <Guard>
        <ClassLayout>
          <ClassCourseManagementHomePage />
        </ClassLayout>
      </Guard>
    ),
  },
  {
    path: "/classcourse/:id/assignments",
    element: (
      <Guard>
        <ClassLayout>
          <ClassCourseManagementAssignmentPage />
        </ClassLayout>
      </Guard>
    ),
  },
  {
    path: "/classcourse/:id/submissions/:assignmentId",
    element: (
      <Guard>
        <ClassLayout>
          <ClassCourseAssignmentSubmitedPage />
        </ClassLayout>
      </Guard>
    ),
  },
  {
    path: "/classcourse/:id/guidance/:assignmentId",
    element: (
      <Guard>
        <ClassLayout>
          <ClassCourseAssignmentGuidance />
        </ClassLayout>
      </Guard>
    ),
  },

  {
    path: "/classcourse/:id/grades",
    element: (
      <Guard>
        <ClassLayout>
          <ClassCourseManagementGrades />
        </ClassLayout>
      </Guard>
    ),
  },

  {
    path: "/classcourse/:id/quiz",
    element: (
      <Guard>
        <ClassLayout>
          <ClassCourseAssignmentQuiz />
        </ClassLayout>
      </Guard>
    ),
  },

  {
    path: "/classcourse/:id/quiz/:matn/play",
    element: (
      <Guard>
        <ClassLayout>
          <ClassCourseAssignmentQuizPlay/>
        </ClassLayout>
      </Guard>
    )
  },

  {
    path: "/classcourse/:id/quiz/:matn/submissions",
    element: (
      <Guard>
        <ClassLayout>
          <ClassCourseQuizSubmissionsPage/>
        </ClassLayout>
      </Guard>
    )
  },

  {
    path: "/classcourse/:id/members",
    element: (
      <Guard>
        <ClassLayout>
          <ClassCourseMembersPage/>
        </ClassLayout>
      </Guard>
    )
  },


  /////////////  Student  ////////////////

  {
    path: "student/attendance/:id",
    element: (
      <Guard>
        <MainLayout>
          <AttendancePage />
        </MainLayout>
      </Guard>
    ),
  },

  {
    path: "/student/dashboard",
    element: (
      <Guard>
        <MainLayout>
          <StudentDashboardPage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/student/information",
    element: (
      <Guard>
        <MainLayout>
          <StudentInformationPage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/student/courses/enroll",
    element: (
      <Guard>
        <MainLayout>
          <StudentEnrollClassCoursePage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/student/schedule",
    element: (
      <Guard>
        <MainLayout>
          <StudentSchedulePage />
        </MainLayout>
      </Guard>
    ),
  },
  {
    path: "/student/grades",
    element: (
      <Guard>
        <MainLayout>
          <StudentGradesPage />
        </MainLayout>
      </Guard>
    ),
  },
];
