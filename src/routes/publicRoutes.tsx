import ErrorNotFound from '@/pages/error/404'
import {lazy} from 'react'

const LoginPage = lazy(() => import('@/pages/auth/Login'))

export const publicRoutes = [
    {
        path:'auth/login',
        element: <LoginPage/>
    },
    {
        path:'*',
        element: <ErrorNotFound/>
    }
]