"use client";

import React, { useMemo, useState } from "react";
import { CarFront, FileCheck2, Gauge, CheckCircle2 } from "lucide-react";
import Dropdown from "../ui/dropdown";
import { VehicleInspection } from "./vehicle-inspection";
import { useGetVehiclesQuery } from "@/api/vehicle";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { useGetTripsQuery } from "@/api/trips";
import {
  Trip,
  TripInspectionFormValues,
  TripInspectionPayloadBody,
} from "@/types";
import {
  FLUIDS_ITEMS,
  FLUIDS_SCHEMA,
  GENERAL_ITEMS,
  GENERAL_SCHEMA,
} from "@/utils/constants";
import { TripField } from "./trip-field";
import {
  buildBasePayload,
  buildFluidPayload,
  buildGeneralPayload,
} from "@/utils/buildTripInspectionPayload";
import { getCurrentDate, getCurrentTime } from "@/utils/date";
import { Clock } from "../ui";

export const OdometerRoot = () => {
  // State
  const [mode, setMode] = useState<string>("pre_trip");
  // Queries
  const { data: vehicles } = useGetVehiclesQuery();
  const { data: trips } = useGetTripsQuery();
  // Memos
  const vehicleOptions = useMemo(() => {
    return (
      vehicles?.data?.results?.map((v) => ({
        label: v.vehicle_name,
        value: v.id,
      })) ?? []
    );
  }, [vehicles]);
  const tripOptions = useMemo(() => {
    return (
      trips?.data?.results?.map((t) => ({
        label: `${t.trip_customer || "Unknown"} - ${t.pickup_date || "N/A"}  ${t.pickup_time || "N/A"}`,
        value: t.id,
      })) ?? []
    );
  }, [trips]);

  const TOTAL_ITEMS = FLUIDS_ITEMS.length + GENERAL_ITEMS.length;

  // Form
  const methods = useForm<TripInspectionFormValues>({
    defaultValues: {
      vehicle: undefined,
      trip: undefined,
      trip_name: "pre_trip",
      trip_date: getCurrentDate(),
      start_time: getCurrentTime(),
      start_reading: "",
      fluids: FLUIDS_SCHEMA.map((item) => ({
        key: item.formKey,
        status: 0,
        added: false,
        comments: "",
      })),
      general: GENERAL_SCHEMA.map((item) => ({
        key: item.formKey,
        status: 0,
        comments: "",
      })),
    },
  });
  const { handleSubmit, register, control } = methods;
  // Watches
  const { vehicle, trip, fluids, general } = useWatch({
    control,
  });

  const checkedCount =
    (fluids?.filter((item) => item.status === 1).length ?? 0) +
    (general?.filter((item) => item.status === 1).length ?? 0);

  const progress = Math.round((checkedCount / TOTAL_ITEMS) * 100);

  const onSubmit = (data: TripInspectionFormValues) => {
    if (!data.vehicle || !data.trip) return;

    const selectedTrip = trips?.data?.results?.find(
      (tripItem) => Number(tripItem.id) === Number(data.trip),
    ) as Trip;

    const payload: TripInspectionPayloadBody = {
      ...buildBasePayload(data, mode, selectedTrip),
      ...buildFluidPayload(data.fluids),
      ...buildGeneralPayload(data.general),
    };

    console.log("TripInspectionPayload", payload);
    // TODO: send payload to backend mutation when API endpoint is ready.
  };

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6 ">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Odometer & Inspection
              </h1>
              <p className="text-base sm:text-base text-gray-500 mt-0.5">
                Complete your {mode === "pre_trip" ? "pre-trip" : "post-trip"}{" "}
                checklist
              </p>
            </div>
            <Clock />
          </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
                <CarFront className="w-4 h-4 text-gray-500 mt-1" />
                <div className="w-full">
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    Vehicle
                  </p>
                  <Controller
                    name="vehicle"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        {...field}
                        options={vehicleOptions}
                        onChange={(option) => {
                          field.onChange(option.value);
                        }}
                        className="mt-2 w-full"
                        buttonClassName="px-3 py-2.5 bg-gray-50"
                        value={field.value}
                      />
                    )}
                  />
                </div>
              </label>

              <label className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
                <Gauge className="w-4 h-4 text-gray-500 mt-1" />
                <div className="w-full">
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    Current Odometer Reading
                  </p>
                  <input
                    {...register("start_reading")}
                    type="number"
                    min={0}
                    placeholder="e.g. 102545"
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-base text-gray-800 outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-300"
                  />
                </div>
              </label>
            </div>

            {vehicle && (
              <TripField
                control={control}
                tripOptions={tripOptions}
                mode={mode}
                setMode={setMode}
              />
            )}

            {trip && (
              <VehicleInspection progress={progress} control={control} />
            )}

            {trip && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {checkedCount} of {TOTAL_ITEMS} items marked as good
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-base font-semibold hover:bg-emerald-600 transition"
                >
                  <FileCheck2 className="w-4 h-4" />
                  Submit Inspection
                </button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
