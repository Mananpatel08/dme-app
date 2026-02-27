import { create } from "zustand";
import { IncomingMessage, IncomingStatusUpdate, Message } from "@/types";

interface ChatStoreState {
  inputText: string;
  page: number;
  apiMessages: Message[];
  loadedPages: number[];
  hasMoreMessages: boolean;
  liveMessages: Message[];
  showScrollButton: boolean;
  setInputText: (value: string) => void;
  setPage: (value: number) => void;
  incrementPage: () => void;
  setShowScrollButton: (value: boolean) => void;
  mergeApiMessages: (payload: {
    page: number;
    messages: Message[];
    hasNext: boolean;
  }) => void;
  resetInputText: () => void;
  addOptimisticMessage: (payload: {
    chatRoomId: number;
    senderId: number;
    message: string;
  }) => void;
  applyStatusUpdate: (payload: IncomingStatusUpdate) => void;
  upsertIncomingMessage: (payload: IncomingMessage) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  inputText: "",
  page: 1,
  apiMessages: [],
  loadedPages: [],
  hasMoreMessages: true,
  liveMessages: [],
  showScrollButton: false,

  setInputText: (value) => set({ inputText: value }),
  setPage: (value) => set({ page: value }),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  setShowScrollButton: (value) => set({ showScrollButton: value }),
  mergeApiMessages: ({ page, messages, hasNext }) =>
    set((state) => {
      if (state.loadedPages.includes(page)) {
        return { hasMoreMessages: hasNext };
      }

      const existingIds = new Set(state.apiMessages.map((msg) => msg.id));
      const deduped = messages.filter((msg) => !existingIds.has(msg.id));

      return {
        hasMoreMessages: hasNext,
        loadedPages: [...state.loadedPages, page],
        // Older pages are prepended to preserve chronological order.
        apiMessages: [...deduped, ...state.apiMessages],
      };
    }),
  resetInputText: () => set({ inputText: "" }),

  addOptimisticMessage: ({ chatRoomId, senderId, message }) =>
    set((state) => ({
      liveMessages: [
        ...state.liveMessages,
        {
          id: `temp-${Date.now()}`,
          chat_room: chatRoomId,
          message,
          sender: senderId,
          created_at: new Date().toISOString(),
        },
      ],
    })),

  applyStatusUpdate: ({ message_ids, status }) =>
    set((state) => ({
      liveMessages: state.liveMessages.map((msg) =>
        message_ids.includes(Number(msg.id)) ? { ...msg, status } : msg,
      ),
    })),

  upsertIncomingMessage: (payload) =>
    set((state) => {
      const tempIndex = state.liveMessages.findIndex(
        (msg) =>
          typeof msg.id === "string" &&
          msg.id.startsWith("temp-") &&
          msg.sender === payload.sender &&
          msg.message === payload.message,
      );

      if (tempIndex === -1) {
        return { liveMessages: [...state.liveMessages, payload] };
      }

      const updatedLiveMessages = [...state.liveMessages];
      updatedLiveMessages[tempIndex] = payload;
      return { liveMessages: updatedLiveMessages };
    }),
}));
