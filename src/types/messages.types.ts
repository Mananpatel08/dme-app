export type MessageStatus = "sent" | "delivered" | "read";

export interface Message {
  id: string;
  message: string;
  sender: number;
  created_at: string;
  status?: MessageStatus;
  chat_room: number;
}

export type IncomingMessage = {
  type: "chat_message";
  id: string;
  chat_room: number;
  message: string;
  sender: number;
  created_at: string;
  status?: MessageStatus;
};

export type IncomingStatusUpdate = {
  type: "status_update";
  chat_room: number;
  message_ids: number[];
  status: MessageStatus;
};

export type OutgoingMessage = {
  action: string;
  room_id: number;
  message: string;
};

export type OutgoingStatusUpdate = {
  action: string;
  room_id: number;
};
