import { ForgotPasswordData } from "@/models/types/auth";
import { Input } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

// const ForgotPasswordQuery = useQuery<ForgotPasswordData, Error>(

export default function ForgotPassword() {
  const forgotPasswordForm = useForm<ForgotPasswordData>({
    defaultValues: {
      email: null!,
    },
    shouldFocusError: true,
  });

  return (
    <div>
      <form>
        <Input
          type="email"
          placeholder="Enter email"
          {...forgotPasswordForm.register("email", {
            required: "Email is required",
          })}
        />
      </form>
    </div>
  );
}
