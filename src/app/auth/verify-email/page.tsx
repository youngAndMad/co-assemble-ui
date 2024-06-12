"use client";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const router = useRouter();
  const { email, token } = router.query;

  // Log the email and token to the console
  console.log("Email:", email);
  console.log("Token:", token);

  // Render your component based on the email and token
  return (
    <div>
      <h1>Verify Email</h1>
      <p>Email: {email}</p>
      <p>Token: {token}</p>
    </div>
  );
};

export default VerifyEmail;
