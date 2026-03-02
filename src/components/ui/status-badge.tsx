import { STATUS_OPTIONS } from "@/utils/constants";
import React from "react";

export const StatusBadge = ({ status }: { status: string }) => {
  const config = STATUS_OPTIONS.find((option) => option.value === status);
  if (!config) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};
