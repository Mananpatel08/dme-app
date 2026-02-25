"use client";

import React, { useState, useRef, useEffect } from "react";
import { InputBox } from "./input-box";
import { MessagesHeader } from "./header";
import { MessageWindow } from "./message-window";
import { Message } from "@/types";
import { SAMPLE_MESSAGES } from "@/utils/constants";
import { formatCurrentTime } from "@/utils/helper";

interface MessagesProps {
  messages?: Message[];
  onSendMessage?: (text: string) => void;
}

export const MessagesRoot = ({
  messages: controlledMessages,
  onSendMessage,
}: MessagesProps) => {
  const [internalMessages, setInternalMessages] =
    useState<Message[]>(SAMPLE_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const messages = controlledMessages ?? internalMessages;
  const [currentTime, setCurrentTime] = useState(formatCurrentTime());

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(formatCurrentTime()),
      30000,
    );
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
    });
  };

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollButton(distanceFromBottom > 100);
  };

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    if (onSendMessage) {
      onSendMessage(trimmed);
    } else {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: trimmed,
        sender: "driver",
        timestamp: formatCurrentTime(),
        status: "sent",
      };
      setInternalMessages((prev) => [...prev, newMsg]);
    }
    setInputText("");

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex h-[calc(100vh-7.8rem)] flex-col overflow-hidden">
      <MessagesHeader currentTime={currentTime} />

      <MessageWindow
        messages={messages}
        todayLabel={todayLabel}
        scrollContainerRef={scrollContainerRef}
        messagesEndRef={messagesEndRef}
        scrollToBottom={scrollToBottom}
        showScrollButton={showScrollButton}
        handleScroll={handleScroll}
      />

      <InputBox
        inputRef={inputRef}
        inputText={inputText}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSend={handleSend}
      />
    </div>
  );
};
