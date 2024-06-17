import React from 'react'
import AuthBackground from "@/app/auth/AuthBackground";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <AuthBackground>
            {children}
        </AuthBackground>
    )
}