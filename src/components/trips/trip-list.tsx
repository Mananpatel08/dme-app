"use client";

import React, { useState } from "react";
import { ArrowUpFromLine, ArrowDownToLine } from "lucide-react";
import { TripDateFilter } from "./date-filter";
import { TabSwitcher } from "../ui";
import { TripCardSkeleton } from "../loader";
import { TripSummary } from "./trip-summary";
import { EmptyState } from "./empty-state";
import { TripCard } from "./trip-card";
import { Trip } from "@/types";

interface TripListProps {
  pickupTrips?: Trip[] | undefined;
  returnTrips?: Trip[] | undefined;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  onShowSchedule?: (date: Date) => void;
  loading?: boolean;
  internalDate: Date;
  setInternalDate: (date: Date) => void;
}

export const TripList = ({
  pickupTrips,
  returnTrips,
  selectedDate: controlledDate,
  onDateChange,
  onShowSchedule,
  loading = false,
  internalDate,
  setInternalDate,
}: TripListProps) => {
  const [activeTab, setActiveTab] = useState<"pickup" | "return">("pickup");

  const date = controlledDate ?? internalDate;
  const pickup = pickupTrips ?? [];
  const returnList = returnTrips ?? [];

  const setDate = (d: Date) => {
    if (onDateChange) onDateChange(d);
    else setInternalDate(d);
  };

  const activeTrips = activeTab === "pickup" ? pickup : returnList;

  const tabs = [
    {
      value: "pickup",
      label: "Pickup",
      icon: ArrowUpFromLine,
      count: pickup.length,
    },
    {
      value: "return",
      label: "Return",
      icon: ArrowDownToLine,
      count: returnList.length,
    },
  ];

  return (
    <div className="flex flex-col gap-4 pb-20">
      <TripDateFilter
        date={date}
        onDateChange={setDate}
        onShowSchedule={onShowSchedule}
        setInternalDate={setInternalDate}
      />

      {/* Tab Switcher */}
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onChange={(value) => setActiveTab(value as "pickup" | "return")}
      />

      {/* Trip Cards */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <>
            <TripCardSkeleton count={3} />
          </>
        ) : activeTrips.length > 0 ? (
          activeTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <EmptyState type={activeTab} />
        )}
      </div>

      {/* Summary Bar */}
      {!loading && (pickup.length > 0 || returnList.length > 0) && (
        <TripSummary
          date={date}
          pickupCount={pickup.length}
          returnCount={returnList.length}
        />
      )}
    </div>
  );
};
