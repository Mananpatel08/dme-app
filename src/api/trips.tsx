import { useQuery } from "@tanstack/react-query";
import TripService from "@/services/trips";

const TRIPS_KEY = ["trips-key"];

export const useGetTripsQuery = () => {
  return useQuery({
    queryKey: TRIPS_KEY,
    queryFn: () => new TripService().getTrips(),
  });
};
