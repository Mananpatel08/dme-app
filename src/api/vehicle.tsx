import VehicleService from "@/services/vehicle";
import { useQuery } from "@tanstack/react-query";

const VEHICLES_KEY = ["vehicles-key"];

export const useGetVehiclesQuery = () => {
  return useQuery({
    queryKey: VEHICLES_KEY,
    queryFn: () => new VehicleService().getVehicles(),
  });
};
