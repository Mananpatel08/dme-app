export interface Message {
  id: string;
  text: string;
  sender: "driver" | "dispatcher";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}
