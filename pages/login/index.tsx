import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import { loginSchema } from '@/validations/loginSchema';
import { AuthenticationContext, AuthenticationContextProps } from '@/context/AuthenticationContext';

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { login, error, clearError } = useContext<AuthenticationContextProps | undefined>(AuthenticationContext) ?? {};
    useEffect(() => {
        if (error) {
            setErrorMessage(error);
            clearError?.();
        }
    }, [error, clearError]);
    return (
        <div className='container'>
            <div className="m-0 sm:my-20 h-screen flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 bg-white shadow sm:rounded p-6 sm:p-12" style={{ maxHeight: '500px' }}>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Sign in for Agents
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: '',
                                    }}
                                    validationSchema={loginSchema}
                                    onSubmit={(values) => {
                                        // alert(JSON.stringify(values, null, 2));
                                        login?.({ email: values.email, password: values.password });
                                    }}>
                                    <Form>
                                        <div className='text-red-500'>{errorMessage}</div>
                                        <div>
                                            <ErrorMessage component='a' className="text-red-500" name='email' />
                                            <Field
                                                id='email'
                                                name='email'
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                type="email"
                                                placeholder="email"
                                            />
                                        </div>
                                        <div className='mt-5'>
                                            <ErrorMessage component='a' className="text-red-500" name='password' />
                                            <Field
                                                id='password'
                                                name='password'
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                                            <span className="ml-3">
                                                Sign In
                                            </span>
                                        </button>
                                    </Form>
                                </Formik>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by Company &nbsp;
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>
                                    &nbsp; and its &nbsp;
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>
                                <div className='text-center my-2'>
                                    Don&apos;t have an account? &nbsp;
                                    <Link className='text-violet-500 underline' href={"/register"}>
                                        Register
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
