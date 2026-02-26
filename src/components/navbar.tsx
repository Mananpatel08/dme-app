"use client";

import React from "react";
import Image from "next/image";
import logo from "@/assets/images/dme_logo.png";
import { LogOut, RefreshCcw } from "lucide-react";
import { useUserContext } from "@/context/userContext";
import { getUsername } from "@/utils/helper";
import AuthService from "@/services/auth";

export const TopNavbar = () => {
  const { userDetails } = useUserContext();

  const authService = new AuthService();

  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const handleLogout = () => {
    authService.removeToken();
  };

  return (
    <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="DME Logo" width={35} height={35} />
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Welcome, {getUsername(userDetails)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={handleRefresh}
          className="rounded-xl hover:text-rose-600 transition p-2 hover:bg-gray-50 cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
        </button>

        <button
          onClick={handleLogout}
          className="rounded-xl hover:text-rose-600 transition p-2 hover:bg-rose-50 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-500" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
