import MainLayout from '@/layouts/mainLayout'
import { lazy } from 'react'

const ListTeacherPage = lazy(() =>  import('@/pages/TeacherManagement/ListTeacher'))
const ScheduleTeacherPage = lazy(() => import('@/pages/TeacherManagement/ScheduleTeacher'))

export const privateRoutes = [
    {
        path: '/teachermanagement/listteacher',
        element: <MainLayout><ListTeacherPage/></MainLayout>
    },
    {
        path: '/teachermanagement/schedules',
        element: <MainLayout><ScheduleTeacherPage/></MainLayout>
    }
]