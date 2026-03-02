"use client";

import React, { useMemo, useState } from "react";
import { BottomNavbar } from "../bottom-navbar";
import { TripList } from "./trip-list";
import { TopNavbar } from "../navbar";
import { useGetTripsQuery } from "@/api/trips";

function toInputDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const TripsRoot = () => {
  const [internalDate, setInternalDate] = useState(new Date());
  const { data: tripList, isLoading } = useGetTripsQuery(
    toInputDateString(internalDate),
  );
  const trips = useMemo(() => tripList?.data.results ?? [], [tripList?.data.results]);

  const pickupTrips = useMemo(
    () => trips,
    [trips],
  );
  const returnTrips = useMemo(
    () => trips.filter((t) => t.returning_now),
    [trips],
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNavbar />

      <div className="px-4 py-4 sm:px-6 sm:py-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <TripList
            internalDate={internalDate}
            setInternalDate={setInternalDate}
            loading={isLoading}
            pickupTrips={pickupTrips}
            returnTrips={returnTrips}
          />
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};
