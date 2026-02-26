"use client";

import { useUserContext } from "@/context/userContext";
import { chatSocket } from "@/services/message/chatSocket";
import { useEffect } from "react";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userDetails, isProfileLoading } = useUserContext();
  const userId = userDetails?.id;

  useEffect(() => {
    if (isProfileLoading) return;

    if (!userId) return;

    chatSocket.connect("/ws/dme/");
  }, [userId, isProfileLoading]);

  useEffect(() => {
    return () => {
      chatSocket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
