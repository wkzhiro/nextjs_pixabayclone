'use client'

import { SessionProvider } from 'next-auth/react'

export default function AuthProvider({ children }) {
    console.log(children)
    console.log(222222)

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
