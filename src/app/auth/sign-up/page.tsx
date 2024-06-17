"use client"
import apiClient from "@/libs/axios";
import { RegisterData } from "@/models/types/auth";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>();

    const [successfullyRegistered, setSuccessfullyRegistered] =
        useState<boolean>(false);

    const registrationMutation = useMutation<void, Error, RegisterData>({
        mutationFn: async (registerData: RegisterData) => {
            await apiClient.post("/api/v1/auth/register", registerData);
        },
        mutationKey: ["register"],
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            setSuccessfullyRegistered(true);
        },
    });

    const onSubmit: SubmitHandler<RegisterData> = (data) =>
        registrationMutation.mutate(data);

    return registrationMutation.isPending ? (
        <>todo</>
    ) : (
        <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-white">
            <div className="relative z-10 max-w-md w-full p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Sign Up to Co-assemble
                </h2>
                <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    SIGN UP
                </button>
                <Link href="/">
          <span className="block text-center text-blue-500 hover:underline">
            Already have an account? Sign In
          </span>
                </Link>
            </div>
        </div>
    );
}
