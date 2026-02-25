"use client";

import { Message } from "@/types";
import { Headset, User } from "lucide-react";
import React from "react";

export const MessageBubble = ({ message }: { message: Message }) => {
  const isDriver = message.sender === "driver";

  return (
    <div className={`flex ${isDriver ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`flex gap-2 max-w-[80%] ${isDriver ? "flex-row-reverse" : ""}`}
      >
        {/* Avatar */}
        {!isDriver && (<div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
            isDriver
              ? "bg-rose-500"
              : "bg-blue-500"
          }`}
        >
          {isDriver ? (
            <User className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          ) : (
            <Headset className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          )}
        </div>)}

        {/* Bubble */}
        <div>
          <div
            className={`px-3 py-2 text-sm leading-relaxed ${
              isDriver
                ? "bg-rose-500 text-white rounded-xl rounded-tr-md"
                : "bg-white text-gray-800 rounded-xl rounded-tl-md border border-gray-100 shadow-sm"
            }`}
          >
            {message.text}
          </div>

          {/* Timestamp + status */}
          <div
            className={`flex items-center gap-1.5 mt-1 px-1 ${
              isDriver ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-[10px] text-gray-400">
              {message.timestamp}
            </span>
            {isDriver && message.status && (
              <StatusIndicator status={message.status} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function StatusIndicator({
  status,
}: {
  status: "sent" | "delivered" | "read";
}) {
  const color =
    status === "read"
      ? "text-blue-500"
      : status === "delivered"
        ? "text-gray-400"
        : "text-gray-300";

  return (
    <span className={`text-[10px] font-medium ${color}`}>
      {status === "sent"
        ? "Sent"
        : status === "delivered"
          ? "Delivered"
          : "Read"}
    </span>
  );
}
