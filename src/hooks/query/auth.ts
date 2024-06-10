import apiClient from "@/libs/axios";
import {
  LoginData,
  MailVerificationData,
  PasswordResetData,
  RegisterData,
} from "@/models/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation<void, Error, LoginData>({
    mutationFn: async (loginData: LoginData) => {
      await apiClient.post("/api/v1/auth/register", loginData);
    },
    mutationKey: ["login"],
  });
};
export const useRegisterMutation = () => {
  return useMutation<void, Error, RegisterData>({
    mutationFn: async (registerData: RegisterData) => {
      await apiClient.post("/api/v1/auth/register", registerData);
    },
    mutationKey: ["register"],
  });
};

// Mutation for email verification
export const useVerifyEmailMutation = () => {
  return useMutation<void, Error, MailVerificationData>({
    mutationFn: async (mailVerificationData: MailVerificationData) => {
      await apiClient.post("/api/v1/auth/verify-email", mailVerificationData);
    },
    mutationKey: ["verify-email"],
  });
};

export const usePasswordResetMutation = () => {
  return useMutation<void, Error, PasswordResetData>({
    mutationFn: async (passwordResetData: PasswordResetData) => {
      await apiClient.post("/api/v1/auth/password-reset", passwordResetData);
    },
    mutationKey: ["password-reset"],
  });
};
