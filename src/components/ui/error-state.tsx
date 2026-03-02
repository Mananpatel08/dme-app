"use client";

import { useRouter } from "next/navigation";
import React from "react";

export const ErrorState = ({
  message,
  routePath,
}: {
  message: string;
  routePath: string;
}) => {
  const router = useRouter();
  return (
    <div className="max-w-6xl mx-auto space-y-4 p-4 sm:p-6">
      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center text-gray-500 text-lg font-medium">
            {message}
          </div>
          <button
            type="button"
            className="h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-4 text-sm font-semibold text-gray-700 transition-colors"
            onClick={() => router.push(routePath)}
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};
