import MainLayout from '@/layouts/mainLayout'
import { lazy } from 'react'

const ListTeacherPage = lazy(() =>  import('@/pages/TeacherManagement/ListTeacher'))
const ScheduleTeacherPage = lazy(() => import('@/pages/TeacherManagement/ScheduleTeacher'))
const ListCoursePage = lazy(() => import('@/pages/CourseManagement/ListCourse'))
const ListClassCoursePage = lazy(() => import('@/pages/ClassCourseManagement/ListClassCourse'))

export const privateRoutes = [
    {
        path: '/teachermanagement/listteacher',
        element: <MainLayout><ListTeacherPage/></MainLayout>
    },
    {
        path: '/teachermanagement/schedules',
        element: <MainLayout><ScheduleTeacherPage/></MainLayout>
    },
    {
        path: '/coursemanagement/listcourse',
        element: <MainLayout><ListCoursePage/></MainLayout>
    },
    {
        path: '/classcoursemanagement/listclasscourse',
        element: <MainLayout><ListClassCoursePage/></MainLayout>
    }
]