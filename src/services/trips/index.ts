import { PaginatedResponse, TripListItem } from "@/types";
import { Client } from "../apiClient";

const client = new Client();

export default class TripService {
  async getTrips(): Promise<PaginatedResponse<TripListItem>> {
    const response = await client.api({
      method: "GET",
      url: "/api/trips/",
    });
    return response.data;
  }
}
