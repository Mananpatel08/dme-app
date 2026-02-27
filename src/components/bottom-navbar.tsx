"use client";

import React from "react";
import Link from "next/link";
import { Gauge, CarFront, MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";

export const BottomNavbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const itemStyle = (path: string) =>
    `flex flex-col items-center justify-center p-3 rounded-xl transition cursor-pointer ${
      isActive(path)
        ? "text-red-600 bg-gray-100"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0px_-1px_3px_0px_rgba(0,0,0,0.1)] flex items-center justify-around z-50 py-2 gap-2">
      
      <Link href="/" prefetch className={`${itemStyle("/")} w-fit`}>
        <CarFront className="w-8 h-8" />
      </Link>

      <Link href="/messages" prefetch className={`${itemStyle("/messages")} w-fit`}>
        <MessageCircleMore className="w-8 h-8" />
      </Link>

      <Link href="/odometer" prefetch className={`${itemStyle("/odometer")} w-fit`}>
        <Gauge className="w-8 h-8" />
      </Link>

    </div>
  );
};