import { Message, PaginatedResponse } from "@/types";
import { Client } from "../apiClient";

const client = new Client();

export default class MessageService {
  async getMessages(
    chatRoomId: number,
    page: number,
  ): Promise<PaginatedResponse<Message>> {
    const pageSize = 50;
    const response = await client.api({
      method: "GET",
      url: `/api/messages/${chatRoomId}/?page_size=${pageSize}&page=${page}`,
    });
    return response.data;
  }
}
