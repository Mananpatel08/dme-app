import { Accessibility, Clock, StickyNote, User } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "../ui";
import { Trip } from "@/types";

interface TripCardProps {
  trip: Trip;
}
export const TripCard = ({ trip }: TripCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/trip/${trip?.id}/update`)}
      className="bg-white rounded-2xl border border-gray-100 border-[0.5px] border-gray-300 hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {trip?.trip_customer?.customer?.email}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {trip?.pickup_time?.slice(0, 5)}
                </span>
              </div>
            </div>
          </div>
          <StatusBadge status={trip?.status} />
        </div>

        {/* Route */}
        <div className="flex items-start gap-2 mb-3">
          <div className="flex flex-col items-center mt-1 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="w-0.5 h-6 bg-gray-200 my-0.5" />
            <div className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                Pickup
              </p>
              <p className="text-xs text-gray-700 truncate">
                {trip?.pickup_location}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                Drop-off
              </p>
              <p className="text-xs text-gray-700 truncate">
                {trip?.dropoff_location}
              </p>
            </div>
          </div>
        </div>

        {/* Footer details */}
        {(trip?.notes_for_driver || trip?.needs) && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
            {trip?.needs && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-violet-50 text-violet-700 text-xs font-medium capitalize">
                <Accessibility className="w-3 h-3" />
                {trip?.needs}
              </span>
            )}
            {trip?.notes_for_driver && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs">
                <StickyNote className="w-3 h-3" />
                {trip?.notes_for_driver}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
