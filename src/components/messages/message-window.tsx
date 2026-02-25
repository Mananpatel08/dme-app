import { Message } from "@/types";
import { ChevronDown, MessageSquare } from "lucide-react";
import React from "react";
import { MessageBubble } from "../ui";

interface MessageWindowProps {
  messages: Message[];
  todayLabel: string;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  scrollToBottom: () => void;
  showScrollButton: boolean;
  handleScroll: () => void;
}

export const MessageWindow = ({
  messages,
  todayLabel,
  scrollContainerRef,
  messagesEndRef,
  scrollToBottom,
  showScrollButton,
  handleScroll,
}: MessageWindowProps) => {
  return (
    <div className="relative flex-1 overflow-hidden ">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto px-2 py-4 vertical-scrollbar scrollbar-sm"
      >
        <div className="p-4 max-w-[950px] mx-auto w-full">

        {/* Date separator */}
        <div className="flex items-center justify-center mb-4">
          <div className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
            {todayLabel}
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <MessageSquare className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-500">No messages yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Send a message to the dispatcher
            </p>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom */}
      {showScrollButton && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={() => scrollToBottom()}
            className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition"
          >
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}
        </div>
    </div>
  );
};
