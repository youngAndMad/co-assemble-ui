"use client";
import { useState } from "react";
import apiClient from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Link from "next/link";

type ForgotPasswordParams = {
  token: string | null;
  email: string | null;
};

export default function ConfirmForgotPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  const queryParams: ForgotPasswordParams = {
    token: searchParams.get("token"),
    email: searchParams.get("email"),
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { email, token } = queryParams;

    if (email && token) {
      const query = useQuery({
        queryKey: ["confirmForgotPassword", email, token, password],
        queryFn: async () =>
          apiClient.post("/auth/forgot-password/confirm", {
            email,
            token,
            password,
          }),
      });

      // if (result.isError) {
      //   setError(
      //     `Failed to reset password.${result.error.cause} Please try again.`
      //   );
      // } else {
      //   router.push("/success");
      // }
    }
  };

  if (!queryParams.token || !queryParams.email) {
    return <h1>Invalid token or email</h1>;
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <p className="mb-5 text-left self-start">Reset your password</p>
        <form className="w-80 flex flex-col" onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                borderRadius: "27px",
              },
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
              style: {
                borderRadius: "27px",
              },
            }}
          />
          {error && <p className="text-red-600">{error}</p>}
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#8B8CBAFC",
              borderRadius: "27px",
              width: "50%",
              alignSelf: "center",
            }}
          >
            Reset Password
          </Button>
        </form>
        <div className="flex justify-center pt-5 pb-0">
          <Link href="/auth/sign-up">
            <p className="text-blue-600">Back to sign up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
