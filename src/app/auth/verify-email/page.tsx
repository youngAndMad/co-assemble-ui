"use client";

import { Suspense, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/libs/axios";
import { ProblemDetail } from "@/models/types/api";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const router = useRouter();

  const shouldFetch = email && token;

  const verifyEmailQuery = useQuery<unknown, ProblemDetail>({
    queryKey: shouldFetch ? ["verify-email", { email, token }] : [],
    queryFn: async () => {
      const response = await apiClient.get("/api/v1/auth/verify-email", {
        params: { email, token },
      });
      return response.data || {};
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (verifyEmailQuery.isSuccess) {
      const timeout = setTimeout(() => router.push("/dashboard"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [verifyEmailQuery.isSuccess, router]);

  useEffect(() => {
    if (shouldFetch) {
      verifyEmailQuery.refetch();
    }
  }, [email, token]);

  return shouldFetch ? (
    <Suspense>
      <div className="verify-email-container">
        {verifyEmailQuery.isLoading && <h1>Verifying...</h1>}
        {verifyEmailQuery.isError && <>{verifyEmailQuery.error.message}</>}
        {verifyEmailQuery.isSuccess && (
          <div>
            <h1>Email verified. Redirecting to main page!</h1>
          </div>
        )}
      </div>
    </Suspense>
  ) : (
    <h1>Invalid token or email</h1>
  );
}
