"use client";

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {LoginData} from '@/models/types/auth';
import {useMutation} from '@tanstack/react-query';
import apiClient from '@/libs/axios';
import User from '@/models/types/user';
import {AxiosResponse} from 'axios';
import {emailRegex} from '@/libs/utils';
import {Button, IconButton, InputAdornment, Link, Snackbar, TextField} from '@mui/material';
import {FaEnvelope, FaEye, FaEyeSlash, FaLock} from 'react-icons/fa';
import {ProblemDetail} from "@/models/types/api";

export default function SignIn() {
    const router = useRouter();

    const handleLoginWithGitHub = () => router.push('/oauth2/authorization/github'); // todo move to env

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [signInError, setSignInError] = useState<ProblemDetail | null>(null);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const loginMutation = useMutation<AxiosResponse<User>, ProblemDetail, LoginData>({
        mutationKey: ['sign-in'],
        mutationFn: async (loginData) =>
            apiClient.post<User>('/api/v1/auth/login', loginData),
        onError: (error) => {
            setSignInError(error);
        },
        onSuccess: () => {
            router.push('/dashboard');
        }
    });

    const handleLogin = async (data: LoginData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="flex flex-col items-center">
            <div>
                <p className="mb-5 text-left self-start">Sign in to Co-assemble</p>
                <form
                    className="w-80 flex flex-col"
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <TextField
                        label="E-mail"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        autoComplete="current-email"
                        error={!!errors.email}
                        helperText={errors.email ? 'Please enter a valid email address' : ''}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {value: emailRegex, message: 'Please enter a valid email address'}
                        })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaEnvelope/>
                                </InputAdornment>
                            ),
                            style: {
                                borderRadius: '27px',
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password ? 'Password must be at least 6 characters long' : ''}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {value: 6, message: 'Password must be at least 6 characters long'}
                        })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaLock/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: {
                                borderRadius: '27px',
                            },
                        }}
                    />
                    <Link href="/auth/forgot-password" className="mb-5 text-blue-600"
                          style={{
                              cursor: loginMutation.isPending ? 'not-allowed' : 'pointer'
                          }}
                          onClick={(e) => loginMutation.isPending && e.preventDefault()}
                    >
                        Forgot password?
                    </Link>
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                backgroundColor: '#8B8CBAFC',
                                borderRadius: '27px',
                                width: '50%',
                            }}
                            disabled={loginMutation.isPending}
                        >
                            SIGN IN
                        </Button>
                    </div>
                    <p className="mt-5 p-0 text-center">or</p>
                    <Button
                        className="mt-5"
                        onClick={handleLoginWithGitHub}
                        style={{
                            borderRadius: '27px',
                            boxShadow: '0px 4px 4px #5B4F4F36',
                            border: '1px solid #FFFFFF',
                            font: `Kumbh Sans`,
                            fontWeight: 400,
                            color: `#00000099`,
                            fontSize: `18px`,
                            lineHeight: `22px`,
                            textAlign: `left`,
                        }}
                        disabled={loginMutation.isPending}
                    >
                        Sign in with GitHub
                    </Button>
                </form>
                <p className="mt-5">
                    New here?
                    <Link
                        onClick={(e) => loginMutation.isPending && e.preventDefault()}
                        href="/auth/sign-up" className="text-blue-600"
                        style={{
                            cursor: loginMutation.isPending ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Sign Up!
                    </Link>
                </p>
            </div>
            <Snackbar
                open={!!signInError}
                message={signInError?.message}
                key={signInError?.detail}
            />
        </div>
    );
}
