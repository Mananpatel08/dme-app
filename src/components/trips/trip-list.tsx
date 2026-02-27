"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  StickyNote,
  Accessibility,
  ChevronLeft,
  ChevronRight,
  ArrowUpFromLine,
  ArrowDownToLine,
  Search,
} from "lucide-react";
import { formatDate } from "@/utils/date";

export interface Trip {
  id: string;
  customerName: string;
  time: string;
  pickup: string;
  dropoff: string;
  notesForDriver?: string;
  needs?: string;
  status?: "scheduled" | "in-progress" | "completed" | "cancelled";
}

interface TripListProps {
  pickupTrips?: Trip[];
  returnTrips?: Trip[];
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  onShowSchedule?: (date: Date) => void;
  loading?: boolean;
}

const SAMPLE_PICKUP: Trip[] = [
  {
    id: "p1",
    customerName: "John Doe",
    time: "08:30 AM",
    pickup: "123 Main St, Springfield",
    dropoff: "DME Medical Center",
    notesForDriver: "Ring doorbell twice",
    needs: "Wheelchair",
    status: "scheduled",
  },
  {
    id: "p2",
    customerName: "Jane Smith",
    time: "09:15 AM",
    pickup: "456 Oak Ave, Shelbyville",
    dropoff: "St. Mary's Hospital",
    needs: "Stretcher",
    status: "in-progress",
  },
  {
    id: "p3",
    customerName: "Robert Johnson",
    time: "10:00 AM",
    pickup: "789 Pine Rd, Capital City",
    dropoff: "City Health Clinic",
    notesForDriver: "Patient uses walker",
    status: "completed",
  },
];

const SAMPLE_RETURN: Trip[] = [
  {
    id: "r1",
    customerName: "John Doe",
    time: "02:00 PM",
    pickup: "DME Medical Center",
    dropoff: "123 Main St, Springfield",
    notesForDriver: "Call on arrival",
    needs: "Wheelchair",
    status: "scheduled",
  },
  {
    id: "r2",
    customerName: "Jane Smith",
    time: "03:30 PM",
    pickup: "St. Mary's Hospital",
    dropoff: "456 Oak Ave, Shelbyville",
    needs: "Stretcher",
    status: "scheduled",
  },
];

const STATUS_CONFIG = {
  scheduled: {
    label: "Scheduled",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
  },
};

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function toInputDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function StatusBadge({ status }: { status: Trip["status"] }) {
  const config = STATUS_CONFIG[status ?? "scheduled"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {trip.customerName}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{trip.time}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={trip.status} />
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
              <p className="text-xs text-gray-700 truncate">{trip.pickup}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                Drop-off
              </p>
              <p className="text-xs text-gray-700 truncate">{trip.dropoff}</p>
            </div>
          </div>
        </div>

        {/* Footer details */}
        {(trip.notesForDriver || trip.needs) && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
            {trip.needs && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-violet-50 text-violet-700 text-xs font-medium">
                <Accessibility className="w-3 h-3" />
                {trip.needs}
              </span>
            )}
            {trip.notesForDriver && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs">
                <StickyNote className="w-3 h-3" />
                {trip.notesForDriver}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ type }: { type: "pickup" | "return" }) {
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
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-1.5" />
          <div className="h-3 bg-gray-100 rounded w-20" />
        </div>
        <div className="h-6 bg-gray-100 rounded-full w-20" />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col items-center mt-1">
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="w-0.5 h-6 bg-gray-100 my-0.5" />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}

export const TripList = ({
  pickupTrips,
  returnTrips,
  selectedDate: controlledDate,
  onDateChange,
  onShowSchedule,
  loading = false,
}: TripListProps) => {
  const [internalDate, setInternalDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<"pickup" | "return">("pickup");

  const date = controlledDate ?? internalDate;
  const pickup = pickupTrips ?? SAMPLE_PICKUP;
  const returnList = returnTrips ?? SAMPLE_RETURN;

  const setDate = (d: Date) => {
    if (onDateChange) onDateChange(d);
    else setInternalDate(d);
  };

  const shiftDay = (delta: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + delta);
    setDate(next);
  };

  const goToToday = () => setDate(new Date());

  const activeTrips = activeTab === "pickup" ? pickup : returnList;

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Date Selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-semibold text-gray-800">
              Schedule
            </span>
          </div>
          {!isToday(date) && (
            <button
              onClick={goToToday}
              className="text-xs font-medium text-rose-500 hover:text-rose-600 transition-colors px-2 py-1 rounded-lg hover:bg-rose-50"
            >
              Today
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => shiftDay(-1)}
            className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex-1 flex items-center justify-center relative">
            <input
              type="date"
              value={toInputDateString(date)}
              onChange={(e) => {
                if (e.target.value)
                  setDate(new Date(e.target.value + "T00:00:00"));
              }}
              className="w-full text-center text-sm font-medium text-gray-800 py-2 px-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all cursor-pointer"
            />
          </div>

          <button
            onClick={() => shiftDay(1)}
            className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-gray-400">
            {isToday(date) ? "Today" : formatDate(date)}
          </p>
          <button
            onClick={() => onShowSchedule?.(date)}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all shadow-sm hover:shadow active:scale-[0.98]"
          >
            <Search className="w-3.5 h-3.5" />
            Show Schedule
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("pickup")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === "pickup"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ArrowUpFromLine className="w-4 h-4" />
            Pickup
            {pickup.length > 0 && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  activeTab === "pickup"
                    ? "bg-white/25 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {pickup.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("return")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === "return"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ArrowDownToLine className="w-4 h-4" />
            Return
            {returnList.length > 0 && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  activeTab === "return"
                    ? "bg-white/25 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {returnList.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Trip Cards */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : activeTrips.length > 0 ? (
          activeTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <EmptyState type={activeTab} />
        )}
      </div>

      {/* Summary Bar */}
      {!loading && (pickup.length > 0 || returnList.length > 0) && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Daily Summary
            </p>
            <p className="text-xs text-gray-400">{formatShortDate(date)}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="text-center p-2 rounded-xl bg-emerald-50">
              <p className="text-lg font-bold text-emerald-600">
                {pickup.length}
              </p>
              <p className="text-[10px] text-emerald-500 font-medium mt-0.5">
                Pickups
              </p>
            </div>
            <div className="text-center p-2 rounded-xl bg-rose-50">
              <p className="text-lg font-bold text-rose-600">
                {returnList.length}
              </p>
              <p className="text-[10px] text-rose-500 font-medium mt-0.5">
                Returns
              </p>
            </div>
            <div className="text-center p-2 rounded-xl bg-blue-50">
              <p className="text-lg font-bold text-blue-600">
                {pickup.length + returnList.length}
              </p>
              <p className="text-[10px] text-blue-500 font-medium mt-0.5">
                Total
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
