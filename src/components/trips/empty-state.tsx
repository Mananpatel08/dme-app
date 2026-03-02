import { MapPin } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  type: "pickup" | "return";
}

export const EmptyState = ({ type }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <MapPin className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-500">
        No {type} trips available
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Trips will appear here once scheduled
      </p>
    </div>
  );
};
