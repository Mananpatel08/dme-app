import VehicleService from "@/services/vehicle";
import { useMutation, useQuery } from "@tanstack/react-query";

const VEHICLES_KEY = ["vehicles-key"];
const VEHICLE_INSPECTION_KEY = ["vehicle-inspection-key"];

export const useGetVehiclesQuery = () => {
  return useQuery({
    queryKey: VEHICLES_KEY,
    queryFn: () => new VehicleService().getVehicles(),
  });
};

export const useVehicleInspectionQuery = () => {
  return useMutation({
    mutationKey: VEHICLE_INSPECTION_KEY,
    mutationFn: (data: any) =>
      new VehicleService().vehicleInspection(data),
  });
}

