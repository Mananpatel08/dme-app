"use client";

import { TripDetail } from "./trip-detail";
import { useParams } from "next/navigation";

export const TripDetailRoot = () => {
  const { tripId } = useParams();

  return (
    <div>
      <TripDetail tripId={tripId as string} />
    </div>
  );
};
