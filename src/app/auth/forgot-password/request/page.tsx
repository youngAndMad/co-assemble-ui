"use client";

import apiClient from "@/libs/axios";
import { ProblemDetail } from "@/models/types/api";
import { ForgotPasswordData } from "@/models/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function ForgotPasswordRequestPage() {
  const [email, setEmail] = useState<string | null>(null);

  const forgotPasswordMutation = useMutation<
    unknown,
    ProblemDetail,
    ForgotPasswordData
  >({
    mutationKey: ["forgot-password"],
    mutationFn: async (forgotPasswordData: ForgotPasswordData) => {
      apiClient.post(
        `/api/v1/auth/forgot-password/request/${forgotPasswordData.email}`
      );
    },
    onError: (error) => {},
    onSuccess: () => {},
  });

  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          fontWeight: "400",
          fontSize: "28px",
        }}
      >
        Forgot your password?
      </div>
    </div>
  );
}
