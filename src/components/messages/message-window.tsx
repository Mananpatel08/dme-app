import { Message } from "@/types";
import { ChevronDown } from "lucide-react";
import React from "react";
import { MessageBubble } from "../ui";
import { formatChatDateLabel } from "@/utils/date";

interface MessageWindowProps {
  groupedMessages: { date: string; messages: Message[] }[];
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  scrollToBottom: () => void;
  showScrollButton: boolean;
  handleScroll: () => void;
}

export const MessageWindow = ({
  groupedMessages,
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
          {groupedMessages.map((group) => (
            <div key={group.date}>
              {/* Date separator */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-200" />

                <span className="px-4 text-xs font-medium text-gray-400 capitalize tracking-wider">
                  {formatChatDateLabel(group.date)}
                </span>

                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {group.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </div>
          ))}

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
