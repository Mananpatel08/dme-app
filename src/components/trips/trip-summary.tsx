import React from "react";

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface TripSummaryProps {
  date: Date;
  pickupCount: number;
  returnCount: number;
}

export const TripSummary = ({
  date,
  pickupCount,
  returnCount,
}: TripSummaryProps) => {
  return (
    <div className="bg-white rounded-2xl border-[0.5px] border-gray-300 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Daily Summary
        </p>
        <p className="text-xs text-gray-400">{formatShortDate(date)}</p>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-3">
        <div className="text-center p-2 rounded-xl bg-emerald-50">
          <p className="text-lg font-bold text-emerald-600">{pickupCount}</p>
          <p className="text-[10px] text-emerald-500 font-medium mt-0.5">
            Pickups
          </p>
        </div>
        <div className="text-center p-2 rounded-xl bg-rose-50">
          <p className="text-lg font-bold text-rose-600">{returnCount}</p>
          <p className="text-[10px] text-rose-500 font-medium mt-0.5">
            Returns
          </p>
        </div>
        <div className="text-center p-2 rounded-xl bg-blue-50">
          <p className="text-lg font-bold text-blue-600">
            {pickupCount + returnCount}
          </p>
          <p className="text-[10px] text-blue-500 font-medium mt-0.5">Total</p>
        </div>
      </div>
    </div>
  );
};
