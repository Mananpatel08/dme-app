"use client";

import React from "react";
import Link from "next/link";
import { Gauge, CarFront, MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";

export const BottomNavbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const itemStyle = (path: string) =>
    `flex flex-col items-center justify-center p-2 rounded-xl transition cursor-pointer ${
      isActive(path) ? "text-red-600" : "text-gray-500 hover:text-red-600"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white  border-t-[0.5px] border-gray-300 flex items-center justify-around z-50 py-2 gap-2">
      <Link href="/" prefetch className={`${itemStyle("/")} w-fit`}>
        <CarFront className="w-6 h-6" />
        <span className="text-xs">Trips</span>
      </Link>

      <Link
        href="/messages"
        prefetch
        className={`${itemStyle("/messages")} w-fit`}
      >
        <MessageCircleMore className="w-6 h-6" />
        <span className="text-xs">Messages</span>
      </Link>

      <Link
        href="/odometer"
        prefetch
        className={`${itemStyle("/odometer")} w-fit`}
      >
        <Gauge className="w-6 h-6" />
        <span className="text-xs">Odometer</span>
      </Link>
    </div>
  );
};
