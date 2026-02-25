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
}
