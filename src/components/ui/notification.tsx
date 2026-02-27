"use client";

import React, { useEffect } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "message";

export type NotificationData = {
  type: NotificationType;
  message: string;
};

type NotificationProps = {
  notification: NotificationData;
  onClose?: () => void;
  className?: string;
};

const STYLE_MAP: Record<
  NotificationType,
  {
    container: string;
    icon: React.ReactNode;
  }
> = {
  success: {
    container: "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />,
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-800",
    icon: <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />,
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-800",
    icon: <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />,
  },
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: <Info className="w-4 h-4 text-blue-600 mt-0.5" />,
  },
  message: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: <Info className="w-4 h-4 text-blue-600 mt-0.5" />,
  },
};

export const Notification = ({
  notification,
  onClose,
  className = "",
}: NotificationProps) => {
  const selectedStyle = STYLE_MAP[notification.type];

  useEffect(() => {
    if (!notification) return;
    if (notification.type === "success") {
      const timer = setTimeout(() => {
        onClose?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm font-medium flex items-start gap-3 ${selectedStyle.container} ${className}`}
      role={notification.type === "error" ? "alert" : "status"}
      aria-live={notification.type === "error" ? "assertive" : "polite"}
    >
      <span className="shrink-0">{selectedStyle.icon}</span>
      <span className="flex-1">{notification.message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-xs text-gray-400 hover:text-gray-600"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
