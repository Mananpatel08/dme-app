import MessageService from "@/services/message";
import { useQuery } from "@tanstack/react-query";

const MESSAGES_KEY = (chatRoomId: number) => ["messages-key", chatRoomId];

export const useGetMessagesQuery = (chatRoomId: number) => {
  return useQuery({
    queryKey: MESSAGES_KEY(chatRoomId),
    queryFn: () => new MessageService().getMessages(chatRoomId),
    enabled: !!chatRoomId,
  });
};
