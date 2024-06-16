import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { LoginData } from '@/models/types/auth';
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/libs/axios';
import User from '@/models/types/user';
import { AxiosResponse } from 'axios';
import { emailRegex } from '@/libs/utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const useLoginMutation = () =>
    useMutation<AxiosResponse<User>, Error, LoginData>({
        mutationKey: ["login"],
        mutationFn: async (loginData) => apiClient.post<User>("/api/v1/auth/login", loginData)
    });

export default function LoginForm() {

    const router = useRouter();

    const handleLoginWithGitHub = () => router.push("/oauth2/authorization/github") // todo move to env

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const loginMutation = useLoginMutation();

    const handleLogin = async (data: LoginData) => loginMutation.mutate(data);

    return (
        <div className="flex flex-col items-center">
            <div className="text-left">
                <h2 className="mb-5">Sign in to Co-assemble</h2>
            </div>
            <form className="w-80 flex flex-col"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(handleLogin)}>
                <TextField
                    label="E-mail"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email ? 'Please enter a valid email address' : ''}
                    {...register("email", { pattern: emailRegex })}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password ? 'Password must be at least 6 characters long' : ''}
                    {...register("password", { minLength: 6 })}
                />
                <Link href="#" className="mb-5 text-blue-600">Forgot password?</Link>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="mb-5"
                >
                    SIGN IN
                </Button>
                <p className="mt-5">or</p>
                <Button
                    variant="outlined"

                    className="mt-5"
                    onClick={handleLoginWithGitHub}
                >
                    Sign in with GitHub
                </Button>
            </form>
            <p className="mt-5">New here? <Link href="#" className="text-blue-600">Sign Up!</Link></p>
        </div>
    );
}
