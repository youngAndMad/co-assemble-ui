import React from "react";
import { AxiosResponse } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import apiClient from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

import { LoginData } from "@/models/types/auth";
import Spinner from "@/components/ui/Spinner";
import User from "@/models/types/user";

import "./login.css";
import { useCookies } from "react-cookie";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const [cookies, setCookie] = useCookies();

  const loginMutation = useMutation<AxiosResponse<User, any>, Error, LoginData>(
    {
      mutationFn: async (loginData: LoginData) => {
        return await apiClient.post<User>("/api/v1/auth/login", loginData);
      },
      mutationKey: ["login"],
      onSuccess: (loginResponse) =>
        setCookie("user", loginResponse.data, { path: "/" }),
    }
  );

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      {loginMutation.isPending ? (
        <Spinner />
      ) : (
        <div className="user_forms-login">
          <h2 className="forms_title">Login</h2>
          <form className="forms_form" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="forms_fieldset">
              <div className="forms_field">
                <input
                  type="email"
                  placeholder="Email"
                  className="forms_field-input"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="forms_field">
                <input
                  type="password"
                  placeholder="Password"
                  className="forms_field-input"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
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
      )}
    </>
  );
}
