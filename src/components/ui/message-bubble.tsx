"use client";

import { useUserContext } from "@/context/userContext";
import { Message } from "@/types";
import { formatTime } from "@/utils/date";
import { Circle, CircleCheck, Eye, Headset, User } from "lucide-react";
import React from "react";

export const MessageBubble = ({ message }: { message: Message }) => {
  const { userDetails } = useUserContext();
  const currentUserId = userDetails?.id;
  const isMe = message.sender === currentUserId;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`flex gap-2 max-w-[80%] ${isMe ? "flex-row-reverse" : ""}`}
      >
        {/* Avatar */}
        {!isMe && (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
              isMe ? "bg-rose-500" : "bg-blue-500"
            }`}
          >
            {isMe ? (
              <User className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            ) : (
              <Headset className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            )}
          </div>
        )}

        {/* Bubble */}
        <div>
          <div
            className={`px-3 py-2 text-sm leading-relaxed break-words whitespace-pre-wrap ${
              isMe
                ? "bg-rose-500 text-white rounded-xl rounded-tr-md"
                : "bg-white text-gray-800 rounded-xl rounded-tl-md border border-gray-100 shadow-sm"
            }`}
          >
            {message.message}
          </div>

          {/* Timestamp + status */}
          <div
            className={`flex items-center gap-1.5 mt-1 px-1 ${
              isMe ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-[10px] text-gray-400">
              {formatTime(message.created_at)}
            </span>
            {isMe && message.status && <StatusIcon status={message.status} />}
          </div>
        </div>
      </div>
    </div>
  );
};

function StatusIcon({ status }: { status: "sent" | "delivered" | "read" }) {
  if (status === "sent") return <Circle size={14} className="text-gray-400" />;

  if (status === "delivered")
    return <CircleCheck size={14} className="text-gray-400" />;

  if (status === "read") return <Eye size={14} className="text-blue-500" />;

  return null;
}
