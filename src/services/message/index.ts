import { Message, PaginatedResponse } from "@/types";
import { Client } from "../apiClient";

const client = new Client();

export default class MessageService {
  async getMessages(
    chatRoomId: number,
  ): Promise<PaginatedResponse<Message>> {
    const response = await client.api({
      method: "GET",
      url: `/api/messages/${chatRoomId}/`,
    });
    return response.data;
  }
}
