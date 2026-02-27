import { Headset } from "lucide-react";
import React from "react";
import { Clock } from "../ui";

export const MessagesHeader = () => {
  return (
    <div className="sticky top-0 z-20 shadow-sm bg-white border-b border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <Headset className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Dispatcher</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
        <Clock />
      </div>
    </div>
  );
};
