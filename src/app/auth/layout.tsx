import React from 'react'
import LoginBackground from "@/app/auth/LoginBackground";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <LoginBackground>
            {children}
        </LoginBackground>
    )
}