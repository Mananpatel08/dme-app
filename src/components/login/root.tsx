"use client";

import React from "react";
import { Loader2, Lock, User } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/dme_logo.png";
import { BrowserPersistence } from "@/utils/simplePersistence";
import { LoginCredentials } from "@/types";
import { loginSchema } from "@/utils/validationSchema";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "@/api/auth";
import AuthService from "@/services/auth";

const storage = new BrowserPersistence();

export const LoginRoot = () => {
  const { mutate: loginMutation, isPending } = useLoginMutation();

  const storedEmail = storage.getItem("username") || "";
  const storedPassword = storage.getItem("savedPass") || "";
  const storedSaveCredentials = storage.getItem("username") ? true : false;

  const defaultValues = {
    username: storedEmail || "",
    password: storedPassword ? JSON.parse(atob(storedPassword)) : "",
    saveCreations: storedSaveCredentials,
  };

  const methods = useForm<LoginCredentials>({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleLogin = (data: LoginCredentials) => {
    loginMutation(data, {
      onSuccess: (data) => {
        new AuthService().setToken(data.data.access_token);
        window.location.href = "/";
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex justify-center mb-6">
        <Image src={logo} alt="Logo" width={100} height={100} />
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 pt-12 relative"
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
              <User className="w-4 h-4 mr-3 text-gray-400 transition-colors duration-300 focus-within:text-red-600" />
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
              <Lock className="w-4 h-4 mr-3 text-gray-400 transition-colors duration-300 focus-within:text-red-600" />
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full py-2 text-base bg-transparent outline-none placeholder-gray-400"
                autoComplete="off"
              />
            </div>

            {errors.password && (
              <p className="text-sm text-red-600 mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer mb-6">
            <input
              name="saveCreations"
              type="checkbox"
              className="w-4 h-4 appearance-none border border-gray-300 rounded-sm 
                checked:bg-red-600 checked:border-red-600 
                relative checked:after:content-['✔'] 
                checked:after:text-white 
                checked:after:text-[12px] 
                checked:after:absolute 
                checked:after:top-[-2px] 
                checked:after:left-[2px]"
            />
            <span className="text-sm text-gray-600 select-none">
              Remember me?
            </span>
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-3 rounded-full font-medium shadow-md flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
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
