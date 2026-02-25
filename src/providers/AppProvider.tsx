"use client";

import React from "react";
import QueryWrapper from "@/utils/QueryWrapper";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <QueryWrapper>{children}</QueryWrapper>;
}
