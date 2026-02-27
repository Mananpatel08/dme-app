"use client";

import React, { useRef, useEffect, useMemo, useLayoutEffect } from "react";
import { InputBox } from "./input-box";
import { MessagesHeader } from "./header";
import { MessageWindow } from "./message-window";
import {
  IncomingMessage,
  IncomingStatusUpdate,
  OutgoingMessage,
  OutgoingStatusUpdate,
} from "@/types";
import { groupMessagesByDate } from "@/utils/helper";
import { useGetMessagesQuery } from "@/api/messages";
import { chatSocket } from "@/services/message/chatSocket";
import { useUserContext } from "@/context/userContext";
import { useChatStore } from "@/store/chat.store";

export const MessagesRoot = () => {
  // useRefs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // store states
  const inputText = useChatStore((state) => state.inputText);
  const page = useChatStore((state) => state.page);
  const apiMessages = useChatStore((state) => state.apiMessages);
  const hasMoreMessages = useChatStore((state) => state.hasMoreMessages);
  const liveMessages = useChatStore((state) => state.liveMessages);
  const showScrollButton = useChatStore((state) => state.showScrollButton);
  // store actions
  const setInputText = useChatStore((state) => state.setInputText);
  const incrementPage = useChatStore((state) => state.incrementPage);
  const setShowScrollButton = useChatStore((state) => state.setShowScrollButton);
  const mergeApiMessages = useChatStore((state) => state.mergeApiMessages);
  const resetInputText = useChatStore((state) => state.resetInputText);
  const addOptimisticMessage = useChatStore(
    (state) => state.addOptimisticMessage,
  );
  const applyStatusUpdate = useChatStore((state) => state.applyStatusUpdate);
  const upsertIncomingMessage = useChatStore(
    (state) => state.upsertIncomingMessage,
  );
  // useContexts
  const { userDetails } = useUserContext();
  const pendingScrollRestoreRef = useRef<{
    previousHeight: number;
    previousTop: number;
  } | null>(null);
  const hasInitialApiScrollRef = useRef(false);
  // derived states
  const userId = userDetails?.id;
  const chatRoomId = 1;
  // queries
  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    isFetching: isMessagesFetching,
  } =
    useGetMessagesQuery(chatRoomId, page);
  // derived states
  const messages = useMemo(() => {
    return [...apiMessages, ...liveMessages];
  }, [apiMessages, liveMessages]);
  const groupedMessages = groupMessagesByDate(messages);
  const isInitialLoading = isMessagesLoading && messages.length === 0;

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

    const isAtTop = el.scrollTop <= 60;
    if (
      isAtTop &&
      hasMoreMessages &&
      !isMessagesLoading &&
      !isMessagesFetching
    ) {
      pendingScrollRestoreRef.current = {
        previousHeight: el.scrollHeight,
        previousTop: el.scrollTop,
      };
      incrementPage();
    }
  };

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    addOptimisticMessage({
      chatRoomId,
      senderId: userId ?? 0,
      message: trimmed,
    });

    const newMsg: OutgoingMessage = {
      action: "send_message",
      room_id: chatRoomId,
      message: trimmed,
    };
    chatSocket.send(newMsg);

    resetInputText();

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
    if (!messagesData) return;
    mergeApiMessages({
      page,
      hasNext: Boolean(messagesData.data.next),
      messages: messagesData.data.results.slice().reverse(),
    });
  }, [mergeApiMessages, messagesData, page]);

  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    const pendingRestore = pendingScrollRestoreRef.current;
    if (!el || !pendingRestore) return;

    const newHeight = el.scrollHeight;
    el.scrollTop = newHeight - pendingRestore.previousHeight + pendingRestore.previousTop;
    pendingScrollRestoreRef.current = null;
  }, [apiMessages.length]);

  useEffect(() => {
    const handleMessage = (data: IncomingMessage | IncomingStatusUpdate) => {
      if (data.type === "status_update") {
        applyStatusUpdate(data);
        return;
      }

      if (data.type === "chat_message") {
        upsertIncomingMessage(data);

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
  }, [applyStatusUpdate, upsertIncomingMessage, userId]);

  useEffect(() => {
    if (!hasInitialApiScrollRef.current && apiMessages.length > 0) {
      scrollToBottom(false);
      hasInitialApiScrollRef.current = true;
    }
  }, [apiMessages.length]);

  useEffect(() => {
    if (liveMessages.length > 0) {
      scrollToBottom();
    }
  }, [liveMessages.length]);

  useEffect(() => {
    markRoomAsRead();
  }, []);

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col overflow-hidden">
      <MessagesHeader />

      <MessageWindow
        groupedMessages={groupedMessages}
        scrollContainerRef={scrollContainerRef}
        messagesEndRef={messagesEndRef}
        scrollToBottom={scrollToBottom}
        showScrollButton={showScrollButton}
        handleScroll={handleScroll}
        isLoading={isInitialLoading}
        isFetchingOlder={isMessagesFetching && page > 1}
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
