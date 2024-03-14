import type { Metadata } from 'next'
import AuthPage from '@/screens/auth/AuthPage'

export const metadata: Metadata = {
    title: 'Home',
}

export default function Home() {
    return <AuthPage />
}
