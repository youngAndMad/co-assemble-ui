"use client";
import React from "react";
import LoginBackground from "@/app/auth/sign-in/LoginBackground";
import LoginForm from "@/app/auth/sign-in/LoginForm";

export default function Login() {
    return (
        <LoginBackground>
            <LoginForm/>
        </LoginBackground>
    );
}
