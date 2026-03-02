import React from "react";

export const TripDetailSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-4 animate-pulse">
      <div className="p-4 sm:p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-6 w-48 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-12 bg-gray-200 rounded-full" />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:max-w-[14rem]">
          <div className="h-10 rounded-xl bg-gray-200" />
          <div className="h-10 rounded-xl bg-gray-200" />
          <div className="h-10 rounded-xl bg-gray-200" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 space-y-2"
            >
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Status Section */}
        <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
          <div className="h-3 w-20 mb-3 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
