import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TripService from "@/services/trips";
import { PaginatedResponse, Status, Trip } from "@/types";

const TRIPS_KEY = (pickup_date?: string) => ["trips-key", pickup_date];
const TRIP_KEY = (tripId: string) => ["trip-key", tripId];
const TRIP_UPDATE_KEY = (tripId: string) => ["trip-update-key", tripId];

export const useGetTripsQuery = (pickup_date?: string) => {
  return useQuery({
    queryKey: TRIPS_KEY(pickup_date),
    queryFn: () => new TripService().getTrips(pickup_date),
  });
};

export const useGetTripQuery = (tripId?: string) => {
  return useQuery({
    queryKey: TRIP_KEY(tripId || ""),
    queryFn: () => new TripService().getTrip(tripId as string),
    enabled: !!tripId,
  });
};

export const useUpdateTripMutation = (tripId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TRIP_UPDATE_KEY(tripId),
    mutationFn: (status: Status) =>
      new TripService().updateTrip(tripId, status),
    onSuccess: (updatedTrip) => {
      queryClient.setQueryData<Trip>(TRIP_KEY(tripId), updatedTrip);

      queryClient.setQueriesData<PaginatedResponse<Trip>>(
        { queryKey: ["trips-key"] },
        (old) => {
          if (!old?.data?.results) return old;

          return {
            ...old,
            data: {
              ...old.data,
              results: old.data.results.map((t) =>
                String(t.id) === String(updatedTrip.id)
                  ? { ...t, ...updatedTrip }
                  : t,
              ),
            },
          };
        },
      );
    },
  });
};
