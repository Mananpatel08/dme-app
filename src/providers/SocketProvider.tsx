"use client";

import { useUserContext } from "@/context/userContext";
import { chatSocket } from "@/services/message/chatSocket";
import CookiePersistence from "@/utils/cookiePersistence";
import { useEffect } from "react";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userDetails, isProfileLoading } = useUserContext();
  const userId = userDetails?.id;

  const token = new CookiePersistence().getItem("token");

  useEffect(() => {
    if (isProfileLoading) return;

    if (!userId) return;

      chatSocket.connect(`/ws/dme/?token=${token}`);
  }, [userId, isProfileLoading, token]);

  useEffect(() => {
    return () => {
      chatSocket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
