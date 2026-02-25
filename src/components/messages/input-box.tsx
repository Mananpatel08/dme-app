import { SendHorizontal } from "lucide-react";
import React from "react";

interface InputBoxProps {
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  inputText: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSend: () => void;
}

export const InputBox = ({
  inputRef,
  inputText,
  handleInputChange,
  handleKeyDown,
  handleSend,
}: InputBoxProps) => {
  return (
    <div className="sticky bottom-0 z-20 px-3 max-w-[950px] mx-auto w-full">
      <div className="relative flex items-center">
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 shadow-sm text-base text-gray-800 placeholder-gray-400 resize-none outline-none py-2 px-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all max-h-[120px]"
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            inputText.trim()
              ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm hover:shadow active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <SendHorizontal className="w-4.5 h-4.5" strokeWidth={2.5} />
        </button>
      </div>
      {/* <p className="text-[10px] text-gray-400 mt-2 px-1">
            Press Enter to send, Shift+Enter for new line
          </p> */}
    </div>
  );
};
