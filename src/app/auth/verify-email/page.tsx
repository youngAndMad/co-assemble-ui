"use client";

import apiClient from "@/libs/axios";
import { sleep } from "@/libs/rxjs";
import { useQuery } from "@tanstack/react-query";

type EmailVerificationData = {
  email: string;
  token: string;
};

const extractQueryParams = (): EmailVerificationData => {
  // const params = new URLSearchParams(window.location.search);
  // console.log(params);
  return { email: "params.get(email)!", token: "params.get(token)!" };
};

const verifyEmailQuery = ({ email, token }: EmailVerificationData) => {
  return useQuery({
    queryKey: ["verify-email", { email, token }],
    queryFn: async () => {
      apiClient.get(`/api/v1/auth/verify-email`, {
        params: { email, token },
      });
    },
    refetchOnReconnect: true,
  });
};

const VerifyEmail = () => {
  const { email, token } = extractQueryParams();
  if (!email || !token) {
    return <h1>Invalid URL</h1>;
  }

  const verifyEmail = verifyEmailQuery({ email, token });

  if (verifyEmail.isSuccess) {
    sleep(3000).then(async () => {
      // router.push("/some-main-page-shown-after-email-verification");
    });
  }

  return (
    <>
      {verifyEmail.isPending ? (
        <h1>Verifying...</h1>
      ) : verifyEmail.isError ? (
        <>{verifyEmail.error.message}</>
      ) : (
        <div>
          <h1>Email verified</h1>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
