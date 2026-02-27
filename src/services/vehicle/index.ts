import { PaginatedResponse, Vehicle } from "@/types";
import { Client } from "../apiClient";

const client = new Client();

export default class VehicleService {
  async getVehicles(): Promise<PaginatedResponse<Vehicle>> {
    const response = await client.api({
      method: "GET",
      url: "/api/vehicles/",
    });
    return response.data;
  }

  async vehicleInspection(data: any): Promise<any> {
    const response = await client.api({
      method: "POST",
      url: "/api/vehicle-inspection/",
      data,
    });
    return response.data;
  }
}
