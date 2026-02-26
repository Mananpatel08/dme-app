import MessageService from "@/services/message";
import { useQuery } from "@tanstack/react-query";

const MESSAGES_KEY = (chatRoomId: number, page: number) => ["messages-key", chatRoomId, page];

export const useGetMessagesQuery = (chatRoomId: number, page: number) => {
  return useQuery({
    queryKey: MESSAGES_KEY(chatRoomId, page),
    queryFn: () => new MessageService().getMessages(chatRoomId, page),
    enabled: !!chatRoomId,
  });
};
