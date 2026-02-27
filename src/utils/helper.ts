import { Message, User } from "@/types";

export function getImage(imageUrl: string): string {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  const url = `${process.env.API_BASE_URL}${imageUrl}`;
  return url;
}

export const getUsername = (user: User | null) => {
  if (!user) return "";
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }
  return user.username;
};

export function groupMessagesByDate(messages: Message[]) {
  const groups: Record<string, Message[]> = {};

  messages.forEach((msg) => {
    const date = new Date(msg.created_at);

    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(msg);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, msgs]) => ({
      date,
      messages: msgs,
    }));
}
