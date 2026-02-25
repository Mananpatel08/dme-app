export interface Vehicle {
  id: string;
  vehicle_name: string;
  vin: string;
  registration: string;
}

export interface InspectionItem {
  id: string;
  label: string;
  group?: string;
}

export type InspectionStatus = 0 | 1;

export interface FluidInspectionFormItem {
  key: string;
  status: InspectionStatus;
  added: boolean;
  comments?: string;
}

export interface GeneralInspectionFormItem {
  key: string;
  status: InspectionStatus;
  comments?: string;
}

export interface TripInspectionFormValues {
  vehicle?: number;
  trip?: number;
  trip_name: string;
  trip_date: string;
  start_time: string;
  start_reading: string;
  fluids: FluidInspectionFormItem[];
  general: GeneralInspectionFormItem[];
}

export interface TripInspectionPayload {
  vehicle: number;
  trip: number;
  trip_name: string;
  trip_date: string;
  start_time: string;
  start_reading: string;
}

export type TripInspectionPayloadBody = TripInspectionPayload & {
  [key: string]: string | number;
};
