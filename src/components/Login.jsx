import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-900">
            <div className="w-full max-w-lg bg-gray-100 shadow-lg rounded-xl p-10 border border-gray-300">
                {/* Logo Centered */}
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-bold text-gray-900">
                    Sign in to your account
                </h2>

                {/* Signup Link */}
                <p className="mt-2 text-center text-base text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 mt-4 text-center font-medium">
                        {error}
                    </p>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-6">
                    {/* Email Input */}
                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    'Email address must be a valid address',
                            },
                        })}
                    />

                    {/* Password Input */}
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: true,
                        })}
                    />

                    {/* Sign In Button */}
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
