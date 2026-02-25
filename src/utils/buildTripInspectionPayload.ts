import {
  FluidInspectionFormItem,
  GeneralInspectionFormItem,
  Trip,
  TripInspectionFormValues,
} from "@/types";
import { FLUIDS_SCHEMA, GENERAL_SCHEMA } from "./constants";
import { getCurrentDate, getCurrentTime } from "./helper";

export const buildBasePayload = (
  data: TripInspectionFormValues,
  mode: string,
  selectedTrip?: Trip,
) => ({
  vehicle: Number(data.vehicle),
  trip: Number(data.trip),
  trip_name: mode,
  trip_date: selectedTrip?.pickup_date ?? getCurrentDate(),
  start_time: selectedTrip?.pickup_time ?? getCurrentTime(),
  start_reading: data.start_reading,
});

export const buildFluidPayload = (fluids: FluidInspectionFormItem[]) => {
  return fluids.reduce(
    (acc, item) => {
      const schemaItem = FLUIDS_SCHEMA.find(
        (fluid) => fluid.formKey === item.key,
      );
      if (!schemaItem) return acc;

      acc[`${schemaItem.payloadKey}_good`] = item.status;
      acc[`${schemaItem.payloadKey}_added`] = item.added ? 1 : 0;
      acc[`${schemaItem.payloadKey}_comments`] = item.comments || "";

      return acc;
    },
    {} as Record<string, number | string>,
  );
};

export const buildGeneralPayload = (general: GeneralInspectionFormItem[]) => {
  return general.reduce(
    (acc, item) => {
      const schemaItem = GENERAL_SCHEMA.find(
        (general) => general.formKey === item.key,
      );
      if (!schemaItem) return acc;

      acc[schemaItem.payloadKey] = item.status;
      acc[`${schemaItem.payloadKey}_comments`] = item.comments || "";

      return acc;
    },
    {} as Record<string, number | string>,
  );
};
