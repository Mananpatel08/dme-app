export interface TripListItem {
  id: string;
  trip_customer: string;
  pickup_date: string;
  pickup_time: string;
  status: string;
}

export interface Trip extends TripListItem {
  trip_billing: string;
  receiving_time: string;
  is_recurring_trip: string;
  recurring_trip_frequency: string;
  recurring_trip_end_date: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_address: string;
  notes_for_driver: string;
  returning_now: string;
  mileage: number;
  estimated_time: number;
  needs: string;
  assist_home: string;
  assist_destination: string;
}
