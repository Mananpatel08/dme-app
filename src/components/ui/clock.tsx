"use client";

import { useEffect, useState } from "react";
import { Clock as ClockIcon } from "lucide-react";
import { formatTime } from "@/utils/date";

export const Clock = () => {
  const [time, setTime] = useState<string>(formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
      <ClockIcon className="w-3.5 h-3.5 text-emerald-500" />
      <span className="text-xs font-medium text-gray-600">{time}</span>
    </div>
  );
};
