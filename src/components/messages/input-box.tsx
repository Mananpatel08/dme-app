import { Mic, SendHorizontal } from "lucide-react";
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
  const canSend = Boolean(inputText.trim());

  return (
    <div className="sticky bottom-0 z-20 mx-auto w-full max-w-[980px] px-4 pb-3 pt-2 md:px-6">
      <div className="flex items-end gap-2 rounded-3xl border border-[#E8EAEE] bg-white px-3 py-2 shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Write your message"
          className="max-h-[120px] min-h-[24px] flex-1 resize-none border-0 bg-transparent px-1 py-[7px] vertical-scrollbar scrollbar-sm text-base text-slate-700 outline-none placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className={`mb-0.5 grid h-8 w-8 place-items-center rounded-full transition-all duration-200 ${
            canSend
              ? "bg-rose-500 text-white hover:bg-[#0668D9] active:scale-95"
              : "cursor-not-allowed bg-[#DDE3EB] text-white"
          }`}
        >
          <SendHorizontal className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
};
