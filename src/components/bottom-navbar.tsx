"use client";

import React from "react";
import { Gauge, CarFront, MessageCircleMore } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const BottomNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (name: string) => pathname === `/${name}`;

  const itemStyle = (name: string) =>
    `flex flex-col items-center justify-center p-2 rounded-md transition cursor-pointer ${
      isActive(name)
        ? "text-red-600 bg-gray-100"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0px_-1px_3px_0px_rgba(0,0,0,0.1)] flex items-center justify-around z-50 py-2 gap-2">
      <button
        onClick={() => router.push("/")}
        className={`${itemStyle("")} w-fit`}
      >
        <CarFront className="w-6 h-6" />
      </button>

      <button
        onClick={() => router.push("/messages")}
        className={`${itemStyle("messages")} w-fit`}
      >
        <MessageCircleMore className="w-6 h-6" />
      </button>

      <button
        onClick={() => router.push("/odometer")}
        className={`${itemStyle("odometer")} w-fit`}
      >
        <Gauge className="w-6 h-6" />
      </button>
    </div>
  );
};
