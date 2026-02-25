"use client";

import React from "react";
import { BottomNavbar } from "../bottom-navbar";
import { TripList } from "./trip-list";
import { TopNavbar } from "../navbar";

interface TripsRootProps {
  username?: string;
}

export const TripsRoot = ({ username = "Manan" }: TripsRootProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNavbar username={username} />

      <div className="px-4 py-4 sm:px-6 sm:py-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <TripList />
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};
