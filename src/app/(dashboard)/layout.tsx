"use client";

import { BottomNavbar } from "@/components/bottom-navbar";
import { TopNavbar } from "@/components/navbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-16">
      <TopNavbar username="Manan" />

      <div className="flex-1">{children}</div>

      <BottomNavbar />
    </div>
  );
}
