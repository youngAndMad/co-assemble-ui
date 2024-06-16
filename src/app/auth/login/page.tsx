"use client";
import "./Login.css";
import React from "react";
import LoginBackground from "@/app/auth/login/LoginBackground";
import LoginForm from "@/app/auth/login/LoginForm";

export default function Login() {
    return (
        <LoginBackground>
            <LoginForm/>
        </LoginBackground>
    );
}
