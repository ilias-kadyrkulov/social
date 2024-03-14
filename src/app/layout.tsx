import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/layout/Header/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        template: '%s | Social',
        default: 'Social',
    },
    description: 'Social network for you!',
    keywords: [
        'social network',
        'pet project',
        'fullstack',
        'nextjs',
        'nestjs',
        'postgres',
    ],
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                {children}
            </body>
        </html>
    )
}
