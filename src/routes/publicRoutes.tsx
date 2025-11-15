import ErrorNotFound from '@/pages/error/404'
import {lazy} from 'react'

const LoginPage = lazy(() => import('@/pages/auth/Login'))
const ForgotPage = lazy(() => import('@/pages/auth/Forgot'))

export const publicRoutes = [
    {
        path:'auth/login',
        element: <LoginPage/>
    },
    {
        path:'auth/forgot',
        element: <ForgotPage/>
    },
    {
        path:'*',
        element: <ErrorNotFound/>
    }
]