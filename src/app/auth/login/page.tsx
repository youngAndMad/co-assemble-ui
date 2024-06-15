"use client";
import React from "react";
import SocialLogin from "@/components/ui/auth/SocialLogin";
import "./login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegistrationForm";

export default function Login() {
  const userForms = document.getElementById(
    "user_options-forms"
  ) as HTMLElement;

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">
              This is a Task Performance in WebSys (midterms) by Crissa Aguilos.
            </p>
            <button
              className="user_unregistered-signup"
              id="signup-button"
              onClick={() => {
                userForms.classList.remove("bounceRight");
                userForms.classList.add("bounceLeft");
              }}
            >
              Register
            </button>
          </div>

          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">
              This is a Task Performance in WebSys (midterms) by Crissa Aguilos.
            </p>
            <button
              className="user_registered-login"
              id="login-button"
              onClick={() => {
                userForms.classList.remove("bounceLeft");
                userForms.classList.add("bounceRight");
              }}
            >
              Login
            </button>
            <SocialLogin />
          </div>
        </div>

        <div className="user_options-forms" id="user_options-forms">
          <LoginForm />
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
