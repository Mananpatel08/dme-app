"use client";

import React from "react";
import QueryWrapper from "@/utils/QueryWrapper";
import { UserProvider } from "@/context/userContext";
import SocketProvider from "./SocketProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryWrapper>
      <UserProvider>
        <SocketProvider>{children}</SocketProvider>
      </UserProvider>
    </QueryWrapper>
  );
}
