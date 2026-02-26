"use client";

import React from "react";

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col h-full bg-gray-100 animate-pulse">
      {/* Messages */}
      <div className="flex-1 overflow-hidden px-4 py-6 space-y-4">
        {/* Left message */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-1/2 h-10 bg-gray-300 rounded-xl rounded-tl-md" />
        </div>

        {/* Right message */}
        <div className="flex justify-end">
          <div className="w-48 h-10 bg-gray-300 rounded-xl rounded-tr-md" />
        </div>

        {/* Left message */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-40 h-10 bg-gray-300 rounded-xl rounded-xl rounded-tl-md" />
        </div>

        {/* Right message */}
        <div className="flex justify-end">
          <div className="w-1/2 h-16 bg-gray-300 rounded-xl rounded-xl rounded-tr-md" />
        </div>

        {/* Left message */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-1/3 h-10 bg-gray-300 rounded-xl rounded-xl rounded-tl-md" />
        </div>
      </div>
    </div>
  );
};
