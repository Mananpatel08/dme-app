import { PaginatedResponse, Trip } from "@/types";
import { Client } from "../apiClient";

const client = new Client();

export default class TripService {
  async getTrips(pickup_date?: string): Promise<PaginatedResponse<Trip>> {
    const params = new URLSearchParams();
    if (pickup_date) {
      params.set("pickup_date_after", pickup_date);
      params.set("pickup_date_before", pickup_date);
    }
    const response = await client.api({
      method: "GET",
      url: `/api/trips/?${params.toString()}`,
    });
    return response.data;
  }

  async getTrip(tripId: string): Promise<Trip> {
    const response = await client.api({
      method: "GET",
      url: `/api/trips/${tripId}/`,
    });
    return response.data.data;
  }

  async updateTrip(tripId: string, status: string): Promise<Trip> {
    const response = await client.api({
      method: "PUT",
      url: `/api/trips/${tripId}/`,
      data: {
        status,
      },
    });
    return response.data;
  }
}
