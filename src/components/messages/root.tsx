"use client";

import React, { useState, useRef, useEffect } from "react";
import { InputBox } from "./input-box";
import { MessagesHeader } from "./header";
import { MessageWindow } from "./message-window";
import {
  IncomingMessage,
  IncomingStatusUpdate,
  Message,
  OutgoingMessage,
  OutgoingStatusUpdate,
} from "@/types";
import { groupMessagesByDate } from "@/utils/helper";
import { useGetMessagesQuery } from "@/api/messages";
import { chatSocket } from "@/services/message/chatSocket";
import { useUserContext } from "@/context/userContext";

export const MessagesRoot = () => {
  // useRefs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // useStates
  const [inputText, setInputText] = useState("");
  const [LiveMessages, setLiveMessages] = useState<Message[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  // useContexts
  const { userDetails } = useUserContext();
  // derived states
  const userId = userDetails?.id;
  const chatRoomId = 1;
  // queries
  const { data: messagesData } = useGetMessagesQuery(chatRoomId);
  // derived states
  const ApiMessages = messagesData?.data.results ?? [];
  const messages = [...ApiMessages, ...LiveMessages];
  const groupedMessages = groupMessagesByDate(messages);

  // function
  const markRoomAsRead = () => {
    const newStatus: OutgoingStatusUpdate = {
      action: "mark_read",
      room_id: chatRoomId,
    };
    chatSocket.send(newStatus);
  };

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollButton(distanceFromBottom > 100);
  };

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      chat_room: chatRoomId,
      message: trimmed,
      sender: userId ?? 0,
      created_at: new Date().toISOString(),
    };

    setLiveMessages((prev) => [...prev, optimisticMessage]);

    const newMsg: OutgoingMessage = {
      action: "send_message",
      room_id: chatRoomId,
      message: trimmed,
    };
    chatSocket.send(newMsg);

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

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
    });
  };

  // useEffects
  useEffect(() => {
    const handleMessage = (data: IncomingMessage | IncomingStatusUpdate) => {
      if (data.type === "status_update") {
        setLiveMessages((prev) =>
          prev.map((msg) =>
            data.message_ids.includes(Number(msg.id))
              ? { ...msg, status: data.status }
              : msg,
          ),
        );
        return;
      }

      if (data.type === "chat_message") {
        setLiveMessages((prev) => {
          const tempIndex = prev.findIndex(
            (msg) =>
              typeof msg.id === "string" &&
              msg.id.startsWith("temp-") &&
              msg.sender === data.sender &&
              msg.message === data.message,
          );

          if (tempIndex !== -1) {
            const updated = [...prev];
            updated[tempIndex] = data;
            return updated;
          }

          return [...prev, data];
        });

        const isMine = data.sender === userId;

        if (!isMine) {
          markRoomAsRead();
        }
      }
    };

    chatSocket.subscribe(handleMessage);
    return () => {
      chatSocket.unsubscribe(handleMessage);
    };
  }, [userId]);

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  useEffect(() => {
    markRoomAsRead();
  }, []);

  return (
    <div className="flex h-[calc(100vh-7.8rem)] flex-col overflow-hidden">
      <MessagesHeader />

      <MessageWindow
        groupedMessages={groupedMessages}
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
