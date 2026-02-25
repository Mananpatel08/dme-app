
export interface Vehicle {
  id: string;
  vehicle_name: string;
  vin: string;
  registration: string;
}

export interface InspectionItem {
  id: string;
  label: string;
  group: "fluids" | "safety" | "exterior";
}

export type InspectionStatus = 0 | 1; 

export interface TripInspectionPayload {
  vehicle: number;
  trip: number;
  trip_name: string;

  trip_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm:ss
  start_reading: string; // decimal as string (API format)

  headlights: InspectionStatus;
  headlights_comments: string;

  parking_lights: InspectionStatus;
  parking_lights_comments: string;

  brake_lights: InspectionStatus;
  brake_lights_comments: string;

  backup_lights: InspectionStatus;
  backup_lights_comments: string;

  turn_signals: InspectionStatus;
  turn_signals_comments: string;

  wipers: InspectionStatus;
  wipers_comments: string;

  windows_mirrors: InspectionStatus;
  windows_mirrors_comments: string;

  doors: InspectionStatus;
  doors_comments: string;

  vehicle_body: InspectionStatus;
  vehicle_body_comments: string;

  tires_pressure: InspectionStatus;
  tires_pressure_comments: string;

  lugs_rims: InspectionStatus;
  lugs_rims_comments: string;

  fluids_leaks: InspectionStatus;
  fluids_leaks_comments: string;

  registration: InspectionStatus;
  registration_comments: string;

  insurance_card: InspectionStatus;
  insurance_card_comments: string;

  vehicle_tags: InspectionStatus;
  vehicle_tags_comments: string;

  seat_belts: InspectionStatus;
  seat_belts_comments: string;

  interior_lights: InspectionStatus;
  interior_lights_comments: string;

  exit_lights: InspectionStatus;
  exit_lights_comments: string;

  gauges: InspectionStatus;
  gauges_comments: string;

  equipment: InspectionStatus;
  equipment_comments: string;
}