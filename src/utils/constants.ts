import { InspectionItem, Message } from "@/types";

export const SAMPLE_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Good morning! Your first pickup is at 123 Main St.",
    sender: "dispatcher",
    timestamp: "7:45 AM",
    status: "read",
  },
  {
    id: "2",
    text: "ok",
    sender: "driver",
    timestamp: "7:46 AM",
    status: "read",
  },
  {
    id: "3",
    text: "Heads up — the patient at Oak Ave needs a wheelchair. Please confirm when you arrive.",
    sender: "dispatcher",
    timestamp: "8:10 AM",
    status: "read",
  },
  {
    id: "4",
    text: "I am here",
    sender: "driver",
    timestamp: "8:28 AM",
    status: "delivered",
  },
  {
    id: "5",
    text: "hey",
    sender: "driver",
    timestamp: "8:35 AM",
    status: "sent",
  },
];

export const INSPECTION_ITEMS: InspectionItem[] = [
  { id: "oil", label: "Oil", group: "fluids" },
  { id: "transmission", label: "Transmission", group: "fluids" },
  { id: "fuel", label: "Fuel", group: "fluids" },
  { id: "brake-fluid", label: "Brake Fluid", group: "fluids" },
  { id: "antifreeze", label: "Antifreeze", group: "fluids" },

  { id: "seat_belts", label: "Seat Belts", group: "safety" },
  { id: "interior_lights", label: "Interior Lights", group: "safety" },
  { id: "exit_lights", label: "Exit Lights", group: "safety" },
  { id: "gauges", label: "Gauges", group: "safety" },
  { id: "equipment", label: "Equipment", group: "exterior" },
  { id: "headlights", label: "Headlights", group: "exterior" },
  { id: "parking_lights", label: "Parking Lights", group: "exterior" },
  { id: "brake_lights", label: "Brake Lights", group: "exterior" },
  { id: "backup_lights", label: "Backup Lights", group: "exterior" },
  { id: "turn_signals", label: "Turn Signals", group: "exterior" },

  { id: "wipers", label: "Wipers", group: "exterior" },
  { id: "windows_mirrors", label: "Windows / Mirrors", group: "exterior" },
  { id: "doors", label: "Doors", group: "exterior" },
  { id: "vehicle_body", label: "Vehicle Body", group: "exterior" },
  { id: "tires_pressure", label: "Tires / Pressure", group: "exterior" },
  { id: "lugs_rims", label: "Lugs / Rims", group: "exterior" },
  { id: "fluids_leaks", label: "Fluids Leaks", group: "exterior" },
  { id: "registration", label: "Registration", group: "exterior" },
  { id: "insurance_card", label: "Insurance Card", group: "exterior" },
  { id: "vehicle_tags", label: "Vehicle Tags", group: "exterior" },
];
