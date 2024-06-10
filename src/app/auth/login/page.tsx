"use client";
import "./login.css";
import React, { useEffect, useRef } from "react";

export default function Login() {
  useEffect(() => {
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
  }, []);
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
          </div>
        </div>

        <div className="user_options-forms" id="user_options-forms">
          <div className="user_forms-login">
            <h2 className="forms_title">Login</h2>
            <form className="forms_form">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                    autoFocus
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button type="button" className="forms_buttons-forgot">
                  Forgot password?
                </button>
                <input
                  type="submit"
                  value="Log In"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
          <div className="user_forms-signup">
            <h2 className="forms_title">Register</h2>
            <form className="forms_form">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="forms_field-input"
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="submit"
                  value="Register"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
