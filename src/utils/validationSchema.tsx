import * as Yup from "yup";
import { FLUIDS_SCHEMA, GENERAL_SCHEMA } from "@/utils/constants";

export const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SAFETY_KEYS = GENERAL_SCHEMA.filter((item) => item.group === "safety").map(
  (item) => item.formKey,
);

const EXTERIOR_KEYS = GENERAL_SCHEMA.filter(
  (item) => item.group === "exterior",
).map((item) => item.formKey);

export const vehicleInspectionSchema = Yup.object({
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
      (value) => value !== undefined && value !== "" && !Number.isNaN(Number(value)),
    )
    .test(
      "non-negative",
      "Start reading cannot be negative",
      (value) => Number(value) >= 0,
    ),
  fluids: Yup.array()
    .of(
      Yup.object({
        key: Yup.string().required(),
        status: Yup.number().oneOf([0, 1]).required(),
        added: Yup.boolean().required(),
        comments: Yup.string().nullable(),
      }),
    )
    .test(
      "fluids-one-selected",
      "Select at least one item in the Fluids section.",
      (value) => !!value && value.some((item) => item?.status === 1),
    ),
  general: Yup.array()
    .of(
      Yup.object({
        key: Yup.string().required(),
        status: Yup.number().oneOf([0, 1]).required(),
        comments: Yup.string().nullable(),
      }),
    )
    .test(
      "safety-and-exterior-selected",
      "Select at least one item in both Safety and Exterior & Compliance sections.",
      (value) => {
        if (!value) return false;

        const hasSafety = value.some(
          (item) => SAFETY_KEYS.includes(item?.key as string) && item?.status === 1,
        );  

        const hasExterior = value.some(
          (item) =>
            EXTERIOR_KEYS.includes(item?.key as string) && item?.status === 1,
        );

        return hasSafety && hasExterior;
      },
    ),
});