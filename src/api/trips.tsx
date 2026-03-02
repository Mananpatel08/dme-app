import { useMutation, useQuery } from "@tanstack/react-query";
import TripService from "@/services/trips";

const TRIPS_KEY = (pickup_date?: string) => ["trips-key", pickup_date];
const TRIP_KEY = (tripId: string) => ["trip-key", tripId];
const TRIP_UPDATE_KEY = (tripId: string) => ["trip-update-key", tripId];

export const useGetTripsQuery = (pickup_date?: string) => {
  return useQuery({
    queryKey: TRIPS_KEY(pickup_date),
    queryFn: () => new TripService().getTrips(pickup_date),
  });
};

export const useGetTripQuery = (tripId: string) => {
  return useQuery({
    queryKey: TRIP_KEY(tripId),
    queryFn: () => new TripService().getTrip(tripId),
  });
};

export const useUpdateTripMutation = (tripId: string) => {
  return useMutation({
    mutationKey: TRIP_UPDATE_KEY(tripId),
    mutationFn: (status: string) =>
      new TripService().updateTrip(tripId, status),
  });
};
