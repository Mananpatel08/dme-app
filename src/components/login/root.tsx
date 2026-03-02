"use client";

import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2, Lock, User } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/dme_logo.png";
import { BrowserPersistence } from "@/utils/simplePersistence";
import { LoginCredentials } from "@/types";
import { loginSchema } from "@/utils/validationSchema";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "@/api/auth";
import AuthService from "@/services/auth";
import { AxiosError } from "axios";
import { Notification, NotificationType } from "../ui";

const storage = new BrowserPersistence();

interface LoginFormValues extends LoginCredentials {
  saveCreations: boolean;
}

export const LoginRoot = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
  } | null>(null);

  const { mutate: loginMutation, isPending } = useLoginMutation();

  const storedEmail = (storage.getItem("username") as string | undefined) ?? "";
  const storedSaveCredentials = !!storedEmail;

  const defaultValues = {
    username: storedEmail || "",
    password: "",
    saveCreations: storedSaveCredentials,
  };

  const methods = useForm<LoginFormValues>({
    defaultValues,
    resolver: yupResolver(loginSchema) as Resolver<LoginFormValues>,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleLogin = (data: LoginFormValues) => {
    const { saveCreations, ...credentials } = data;

    loginMutation(credentials, {
      onSuccess: (data) => {
        if (saveCreations) {
          storage.setItem("username", credentials.username);
        } else {
          storage.removeItem("username");
        }
        new AuthService().setToken(data.data.access_token);
        window.location.href = "/";
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ message?: string }>;

        setNotification({
          type: "error",
          message: axiosError.response?.data?.message ?? "Login failed",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex justify-center mb-0 sm:mb-6">
        <Image src={logo} alt="Logo" width={100} height={100} />
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full max-w-md bg-gray-100 sm:bg-white sm:shadow-xl rounded-2xl p-10 pt-12 relative"
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-start">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 text-start mt-2 mb-8">
            Enter your credentials to access your account.
          </p>

          <div className="mb-6">
            <div
              className={`
                flex items-center border-b-2 transition-all duration-300
                border-gray-300 focus-within:border-red-600
              `}
            >
              <User className="w-5 h-5 mr-3 text-gray-400 transition-colors duration-300 focus-within:text-red-600" />
              <input
                {...register("username")}
                type="text"
                placeholder="Enter your username"
                className="w-full py-2 text-base bg-transparent outline-none placeholder-gray-400"
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-600 mt-2">
                {errors.username?.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <div
              className={`
                flex items-center border-b-2 transition-all duration-300
                border-gray-300 focus-within:border-red-600
              `}
            >
              <Lock className="w-5 h-5 mr-3 text-gray-400 transition-colors duration-300 focus-within:text-red-600" />
              <input
                {...register("password")}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full py-2 text-base bg-transparent outline-none placeholder-gray-400 pr-2"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-gray-400 hover:text-red-600 transition-colors duration-300 focus-within:text-red-600 mr-3 cursor-pointer"
              >
                {isPasswordVisible ? (
                  <EyeOffIcon className="w-5 h-5 text-gray-400 transition-colors duration-300 focus-within:text-red-600 hover:text-red-600" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400 transition-colors duration-300 focus-within:text-red-600 hover:text-red-600" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-600 mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer mb-6">
            <input
              {...register("saveCreations")}
              type="checkbox"
              className="w-5 h-5 sm:w-4 sm:h-4 rounded border-gray-300 text-sky-500"
            />
            <span className="text-sm text-gray-600 select-none">
              Remember me?
            </span>
          </label>

          {notification && (
            <Notification
              notification={notification}
              className="mb-6"
              onClose={() => setNotification(null)}
            />
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-3 rounded-xl font-medium shadow-md flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 text-center animate-spin text-white" />
            ) : (
              "SIGN IN"
            )}
          </button>
        </form>
      </FormProvider>
      <div className="text-center mt-8">
        <a
          href="#"
          className="text-sm text-gray-500 hover:text-red-600 transition"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
};
