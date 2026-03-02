import * as Yup from "yup";
import type {
  FluidInspectionFormItem,
  GeneralInspectionFormItem,
  InspectionStatus,
  TripInspectionFormValues,
} from "@/types";
import { GENERAL_SCHEMA } from "./constants";

export const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  saveCreations: Yup.boolean().default(false),
});

const fluidItemSchema: Yup.ObjectSchema<FluidInspectionFormItem> = Yup.object({
  key: Yup.string().required(),
  status: Yup.mixed<InspectionStatus>().oneOf([0, 1] as const).required(),
  added: Yup.boolean().required(),
  comments: Yup.string().optional(),
});

const generalItemSchema: Yup.ObjectSchema<GeneralInspectionFormItem> = Yup.object(
  {
    key: Yup.string().required(),
    status: Yup.mixed<InspectionStatus>().oneOf([0, 1] as const).required(),
    comments: Yup.string().optional(),
  },
);

const SAFETY_KEYS = new Set(
  GENERAL_SCHEMA.filter((item) => item.group === "safety").map(
    (item) => item.formKey,
  ),
);

const EXTERIOR_KEYS = new Set(
  GENERAL_SCHEMA.filter((item) => item.group === "exterior").map(
    (item) => item.formKey,
  ),
);

export const vehicleInspectionSchema: Yup.ObjectSchema<TripInspectionFormValues> =
  Yup.object({
  vehicle: Yup.string().required("Vehicle is required"),
  trip: Yup.string().required("Trip is required"),
  trip_name: Yup.string().required("Trip name is required"),
  trip_date: Yup.string().required("Trip date is required"),
  start_time: Yup.string().required("Start time is required"),
  start_reading: Yup.string()
    .required("Start reading is required")
    .test(
      "is-number",
      "Start reading must be a number",
      (value) =>
        value !== undefined && value !== "" && !Number.isNaN(Number(value)),
    )
    .test(
      "non-negative",
      "Start reading cannot be negative",
      (value) => Number(value) >= 0,
    ),
  fluids: Yup.array()
    .of(fluidItemSchema)
    .required("Fluids are required")
    .test(
      "at-least-one-fluid-selected",
      "Select at least one item in the Fluids section.",
      (value) => (value ?? []).some((item) => item.status === 1),
    )
    .min(1, "Select at least one item in the Fluids section."),
  general: Yup.array()
    .of(generalItemSchema)
    .required("Safety and Exterior & Compliance are required")
    .test(
      "at-least-one-safety-selected",
      "Please select at least one item in the Safety section.",
      (value) =>
        (value ?? []).some(
          (item) => SAFETY_KEYS.has(item.key) && item.status === 1,
        ),
    )
    .test(
      "at-least-one-exterior-selected",
      "Please select at least one item in the Exterior & Compliance section.",
      (value) =>
        (value ?? []).some(
          (item) => EXTERIOR_KEYS.has(item.key) && item.status === 1,
        ),
    )
    .min(
      1,
      "Select at least one item in both Safety and Exterior & Compliance sections.",
    ),
  });
