"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RegisterData, ResendEmailData } from "@/models/types/auth";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/libs/axios";
import User from "@/models/types/user";
import { AxiosResponse } from "axios";
import { emailRegex } from "@/libs/utils";
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  TextField,
} from "@mui/material";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { ProblemDetail } from "@/models/types/api";
import EmailModal from "../EmailModal";

export default function SignUp() {
  const router = useRouter();

  const handleLoginWithGitHub = () =>
    router.push("/oauth2/authorization/github"); // todo move to env

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      email: "", //todo remove
      password: "",
      username: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [signUpError, setSignUpError] = useState<ProblemDetail | null>(null);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const signUpMutation = useMutation<
    AxiosResponse<unknown>,
    ProblemDetail,
    RegisterData
  >({
    mutationKey: ["sign-up"],
    mutationFn: async (registerData) =>
      apiClient.post<User>("/api/v1/auth/register", registerData),
    onError: (error) => {
      setSignUpError(error);
    },
    onSuccess: () => {
      setModalOpen(true);
    },
  });

  const resendEmailMutation = useMutation<
    AxiosResponse<User>,
    ProblemDetail,
    ResendEmailData
  >({
    mutationKey: ["resend-email", getValues("email")],
    mutationFn: async ({ email, option }) =>
      apiClient.post<User>(`/api/v1/auth/resend-email/${email}?type=${option}`),
  });

  const handleSignUp = async (data: RegisterData) => {
    signUpMutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <p className="mb-5 text-left self-start">Sign up to Coassemble</p>
        <form
          className="w-80 flex flex-col"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <TextField
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="current-email"
            error={!!errors.username}
            helperText={errors.email ? "Username is required" : ""}
            {...register("username", {
              required: "Email is required",
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser />
                </InputAdornment>
              ),
              style: {
                borderRadius: "27px",
              },
            }}
          />
          <TextField
            label="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="current-email"
            error={!!errors.email}
            helperText={
              errors.email ? "Please enter a valid email address" : ""
            }
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email address",
              },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaEnvelope />
                </InputAdornment>
              ),
              style: {
                borderRadius: "27px",
              },
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={
              errors.password
                ? "Password must be at least 6 characters long"
                : ""
            }
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {!!errors.password ? (
                      <></>
                    ) : showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: "27px",
              },
            }}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#8B8CBAFC",
                borderRadius: "27px",
                width: "50%",
                paddingTop: "10px",
              }}
              disabled={signUpMutation.isPending}
            >
              SIGN IN
            </Button>
          </div>
          <p className="mt-5 p-0 text-center">or</p>
          <Button
            className="mt-5"
            onClick={handleLoginWithGitHub}
            style={{
              borderRadius: "27px",
              boxShadow: "0px 4px 4px #5B4F4F36",
              border: "1px solid #FFFFFF",
              font: `Kumbh Sans`,
              fontWeight: 400,
              color: `#00000099`,
              fontSize: `18px`,
              lineHeight: `22px`,
              textAlign: `left`,
            }}
            disabled={signUpMutation.isPending}
          >
            Sign in with GitHub
          </Button>
        </form>
        <p className="mt-5">
          Already have an account?{" "}
          <Link
            onClick={(e) => signUpMutation.isPending && e.preventDefault()}
            href="/auth/sign-in"
            className="text-blue-600"
            style={{
              cursor: signUpMutation.isPending ? "not-allowed" : "pointer",
            }}
          >
            Sign Up!
          </Link>
        </p>
      </div>
      <Snackbar
        open={!!signUpError}
        message={signUpError?.message}
        key={signUpError?.detail}
      />
      <EmailModal
        title="Email Confirmation"
        email={getValues("email")}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleResendEmail={() =>
          resendEmailMutation.mutate({
            email: getValues("email"),
            option: "MAIL_VERIFICATION",
          })
        }
      />
    </div>
  );
}
