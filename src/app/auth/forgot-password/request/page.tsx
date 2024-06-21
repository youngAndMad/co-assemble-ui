"use client";

import apiClient from "@/libs/axios";
import { emailRegex } from "@/libs/utils";
import { ProblemDetail } from "@/models/types/api";
import { ForgotPasswordData } from "@/models/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { InputAdornment, TextField, Button } from "@mui/material";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation<
    unknown,
    ProblemDetail,
    ForgotPasswordData
  >({
    mutationKey: ["forgot-password"],
    mutationFn: async (forgotPasswordData: ForgotPasswordData) => {
      apiClient.post(
        "/api/v1/auth/forgot-password/request",
        forgotPasswordData
      );
    },
    onError: (error) => {
      // todo
    },
    onSuccess: () => {
      // todo
    },
  });

  const handleForgotPassword = async (data: ForgotPasswordData) => {};

  return (
    <div className="flex flex-col items-center">
      <div>
        <p className="mb-5 text-left self-start">Forgot your password?</p>
        <form
          className="w-80 flex flex-col"
          onSubmit={handleSubmit(handleForgotPassword)}
        >
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
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#8B8CBAFC",
                borderRadius: "27px",
                width: "50%",
              }}
              disabled={forgotPasswordMutation.isPending}
            >
              Send email
            </Button>
          </div>
          <div className="flex justify-center">
            <p className="mt-10 bottom-0 text-blue-600">
              <Link href="/auth/sign-in">Back to sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
