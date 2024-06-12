"use client";
import React, { useEffect } from "react";
import SocialLogin from "@/components/ui/auth/SocialLogin";
import "./login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegistrationForm";

const registerButtonHandlers = () => {
  const signupButton = document.getElementById(
    "signup-button"
  ) as HTMLButtonElement | null;
  const loginButton = document.getElementById(
    "login-button"
  ) as HTMLButtonElement | null;
  const userForms = document.getElementById(
    "user_options-forms"
  ) as HTMLElement | null;

  const handleSignupButtonClick = () => {
    if (userForms) {
      userForms.classList.remove("bounceRight");
      userForms.classList.add("bounceLeft");
    }
  };

  const handleLoginButtonClick = () => {
    if (userForms) {
      userForms.classList.remove("bounceLeft");
      userForms.classList.add("bounceRight");
    }
  };

  if (signupButton) {
    signupButton.addEventListener("click", handleSignupButtonClick);
  }

  if (loginButton) {
    loginButton.addEventListener("click", handleLoginButtonClick);
  }

  // Cleanup event listeners on component unmount
  return () => {
    if (signupButton) {
      signupButton.removeEventListener("click", handleSignupButtonClick);
    }
    if (loginButton) {
      loginButton.removeEventListener("click", handleLoginButtonClick);
    }
  };
};

export default function Login() {
  useEffect(registerButtonHandlers, []);

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">
              This is a Task Performance in WebSys (midterms) by Crissa Aguilos.
            </p>
            <button className="user_unregistered-signup" id="signup-button">
              Register
            </button>
          </div>

          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">
              This is a Task Performance in WebSys (midterms) by Crissa Aguilos.
            </p>
            <button className="user_registered-login" id="login-button">
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
