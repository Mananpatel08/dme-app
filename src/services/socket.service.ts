import {
  IncomingMessage,
  OutgoingMessage,
  OutgoingStatusUpdate,
} from "@/types";

type MessageHandler = (data: IncomingMessage) => void;

class ChatSocketService {
  private socket: WebSocket | null = null;
  private handlers: Set<MessageHandler> = new Set();
  private baseURL: string;
  private currentPath: string | null = null;

  private reconnectInterval = 3000;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  private manualClose = false;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL || "ws://localhost:8000";
  }

  connect(path: string) {
    if (
      this.socket?.readyState === WebSocket.OPEN ||
      this.socket?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    this.manualClose = false;
    this.currentPath = path;

    const fullURL = `${this.baseURL}${path}`;
    this.socket = new WebSocket(fullURL);

    this.socket.onopen = () => {
      console.log("WebSocket connected:", fullURL);
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      const data: IncomingMessage = JSON.parse(event.data);
      this.handlers.forEach((handler) => handler(data));
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");

      if (
        !this.manualClose &&
        this.currentPath &&
        this.reconnectAttempts < this.maxReconnectAttempts
      ) {
        this.reconnectAttempts++;

        console.log(
          `Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
        );

        setTimeout(() => {
          this.connect(this.currentPath!);
        }, this.reconnectInterval);
      } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.warn("Max reconnect attempts reached. Giving up.");
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.socket?.close();
    };
  }

  disconnect() {
    this.manualClose = true;
    this.socket?.close();
    this.socket = null;
  }

  send(data: OutgoingMessage | OutgoingStatusUpdate) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn("Socket not connected");
    }
  }

  subscribe(handler: MessageHandler) {
    this.handlers.add(handler);
  }

  unsubscribe(handler: MessageHandler) {
    this.handlers.delete(handler);
  }
}

export default ChatSocketService;
