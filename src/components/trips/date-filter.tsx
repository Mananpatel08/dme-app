import { formatDate, isToday } from "@/utils/date";
import { Calendar, ChevronLeft, ChevronRight, Search } from "lucide-react";
import React from "react";

interface TripDateFilterProps {
  date: Date;
  onDateChange: (date: Date) => void;
  onShowSchedule?: (date: Date) => void;
  setInternalDate: (date: Date) => void;
}

function toInputDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const TripDateFilter = ({
  date,
  onDateChange,
  onShowSchedule,
  setInternalDate,
}: TripDateFilterProps) => {
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

  return (
    <div className="bg-white rounded-2xl border-[0.5px] border-gray-300 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-rose-500" />
          <span className="text-sm font-semibold text-gray-800">Schedule</span>
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
  );
};
