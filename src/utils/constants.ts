import { InspectionItem, StatusOption } from "@/types";

export interface InspectionSchemaItem {
  id: string;
  label: string;
  section: "fluids" | "general";
  group?: "safety" | "exterior";
  formKey: string;
  payloadKey: string;
  hasAdded: boolean;
}

export const INSPECTION_SCHEMA: InspectionSchemaItem[] = [
  {
    id: "oil",
    label: "Oil",
    section: "fluids",
    formKey: "oil",
    payloadKey: "oil",
    hasAdded: true,
  },
  {
    id: "transmission",
    label: "Transmission",
    section: "fluids",
    formKey: "transmission",
    payloadKey: "transmission",
    hasAdded: true,
  },
  {
    id: "fuel",
    label: "Fuel",
    section: "fluids",
    formKey: "fuel",
    payloadKey: "fuel",
    hasAdded: true,
  },
  {
    id: "brake-fluid",
    label: "Brake Fluid",
    section: "fluids",
    formKey: "brake",
    payloadKey: "brake_fluid",
    hasAdded: true,
  },
  {
    id: "antifreeze",
    label: "Antifreeze",
    section: "fluids",
    formKey: "antifreeze",
    payloadKey: "anti_freeze",
    hasAdded: true,
  },
  {
    id: "seat_belts",
    label: "Seat Belts",
    section: "general",
    group: "safety",
    formKey: "seat_belts",
    payloadKey: "seat_belts",
    hasAdded: false,
  },
  {
    id: "interior_lights",
    label: "Interior Lights",
    section: "general",
    group: "safety",
    formKey: "interior_lights",
    payloadKey: "interior_lights",
    hasAdded: false,
  },
  {
    id: "exit_lights",
    label: "Exit Lights",
    section: "general",
    group: "safety",
    formKey: "exit_lights",
    payloadKey: "exit_lights",
    hasAdded: false,
  },
  {
    id: "gauges",
    label: "Gauges",
    section: "general",
    group: "safety",
    formKey: "gauges",
    payloadKey: "gauges",
    hasAdded: false,
  },
  {
    id: "equipment",
    label: "Equipment",
    section: "general",
    group: "exterior",
    formKey: "equipment",
    payloadKey: "equipment",
    hasAdded: false,
  },
  {
    id: "headlights",
    label: "Headlights",
    section: "general",
    group: "exterior",
    formKey: "headlights",
    payloadKey: "headlights",
    hasAdded: false,
  },
  {
    id: "parking_lights",
    label: "Parking Lights",
    section: "general",
    group: "exterior",
    formKey: "parking_lights",
    payloadKey: "parking_lights",
    hasAdded: false,
  },
  {
    id: "brake_lights",
    label: "Brake Lights",
    section: "general",
    group: "exterior",
    formKey: "brake_lights",
    payloadKey: "brake_lights",
    hasAdded: false,
  },
  {
    id: "backup_lights",
    label: "Backup Lights",
    section: "general",
    group: "exterior",
    formKey: "backup_lights",
    payloadKey: "backup_lights",
    hasAdded: false,
  },
  {
    id: "turn_signals",
    label: "Turn Signals",
    section: "general",
    group: "exterior",
    formKey: "turn_signals",
    payloadKey: "turn_signals",
    hasAdded: false,
  },
  {
    id: "wipers",
    label: "Wipers",
    section: "general",
    group: "exterior",
    formKey: "wipers",
    payloadKey: "wipers",
    hasAdded: false,
  },
  {
    id: "windows_mirrors",
    label: "Windows / Mirrors",
    section: "general",
    group: "exterior",
    formKey: "windows_mirrors",
    payloadKey: "windows_mirrors",
    hasAdded: false,
  },
  {
    id: "doors",
    label: "Doors",
    section: "general",
    group: "exterior",
    formKey: "doors",
    payloadKey: "doors",
    hasAdded: false,
  },
  {
    id: "vehicle_body",
    label: "Vehicle Body",
    section: "general",
    group: "exterior",
    formKey: "vehicle_body",
    payloadKey: "vehicle_body",
    hasAdded: false,
  },
  {
    id: "tires_pressure",
    label: "Tires / Pressure",
    section: "general",
    group: "exterior",
    formKey: "tires_pressure",
    payloadKey: "tires_pressure",
    hasAdded: false,
  },
  {
    id: "lugs_rims",
    label: "Lugs / Rims",
    section: "general",
    group: "exterior",
    formKey: "lugs_rims",
    payloadKey: "lugs_rims",
    hasAdded: false,
  },
  {
    id: "fluids_leaks",
    label: "Fluids Leaks",
    section: "general",
    group: "exterior",
    formKey: "fluids_leaks",
    payloadKey: "fluids_leaks",
    hasAdded: false,
  },
  {
    id: "registration",
    label: "Registration",
    section: "general",
    group: "exterior",
    formKey: "registration",
    payloadKey: "registration",
    hasAdded: false,
  },
  {
    id: "insurance_card",
    label: "Insurance Card",
    section: "general",
    group: "exterior",
    formKey: "insurance_card",
    payloadKey: "insurance_card",
    hasAdded: false,
  },
  {
    id: "vehicle_tags",
    label: "Vehicle Tags",
    section: "general",
    group: "exterior",
    formKey: "vehicle_tags",
    payloadKey: "vehicle_tags",
    hasAdded: false,
  },
];

export const FLUIDS_SCHEMA = INSPECTION_SCHEMA.filter(
  (item) => item.section === "fluids",
);

export const GENERAL_SCHEMA = INSPECTION_SCHEMA.filter(
  (item) => item.section === "general",
);

export const FLUIDS_ITEMS: InspectionItem[] = [
  ...FLUIDS_SCHEMA.map((item) => ({
    id: item.id,
    label: item.label,
  })),
];

export const GENERAL_ITEMS: InspectionItem[] = [
  ...GENERAL_SCHEMA.map((item) => ({
    id: item.id,
    label: item.label,
    group: item.group,
  })),
];

export const STATUS_OPTIONS: StatusOption[] = [
  {
    label: "Scheduled",
    value: "scheduled",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  {
    label: "Enroute to Pickup",
    value: "enroute_to_pickup",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  {
    label: "Pickup",
    value: "pickup",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  {
    label: "Drop-off",
    value: "drop_off",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
  },
];
