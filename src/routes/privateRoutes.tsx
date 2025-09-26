import MainLayout from '@/layouts/mainLayout'
import { lazy } from 'react'

const ListTeacherPage = lazy(() =>  import('@/pages/TeacherManagement/ListTeacher'))

export const privateRoutes = [
    {
        path: '/teachermanagement/listteacher',
        element: <MainLayout><ListTeacherPage/></MainLayout>
    }
]