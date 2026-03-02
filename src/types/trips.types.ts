export type Status = "scheduled" | "enroute_to_pickup" | "pickup" | "drop_off";

export interface TripListItem {
  id: string;
  trip_customer: any;
  pickup_date: string;
  pickup_time: string;
  status: Status;
}

export interface Trip extends TripListItem {
  trip_billing: any;
  receiving_time: string;
  is_recurring_trip: string;
  recurring_trip_frequency: string;
  recurring_trip_end_date: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_address: string;
  notes_for_driver: string;
  returning_now: boolean;
  mileage: number;
  estimated_time: number;
  needs: string;
  assist_home: string;
  assist_destination: string;
}

export interface StatusOption {
  label: string;
  value: Status;
  bg: string;
  text: string;
  dot: string;
}
