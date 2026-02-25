"use client";

import React, { useMemo, useState } from "react";
import {
  CarFront,
  Clock3,
  FileCheck2,
  Gauge,
  CheckCircle2,
} from "lucide-react";
import Dropdown from "../ui/dropdown";
import { INSPECTION_ITEMS } from "@/utils/constants";
import { VehicleInspection } from "./vehicle-inspection";
import { useGetVehiclesQuery } from "@/api/vehicle";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { useGetTripsQuery } from "@/api/trips";
import { TripInspectionPayload } from "@/types";

export const OdometerRoot = () => {
  // State
  const [mode, setMode] = useState<string>("pre_trip");
  const [odometerReading, setOdometerReading] = useState("");
  const [goodMap, setGoodMap] = useState<Record<string, boolean>>({});
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, string>>({});
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
  const now = useMemo(
    () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    [],
  );
  // Form
  const methods = useForm<TripInspectionPayload>({
    defaultValues: {
      vehicle: undefined,
      trip: undefined,
      trip_name: "pre_trip",
      start_reading: "",
    },
  });
  const { handleSubmit, register, control } = methods;
  // Watches
  const vehicleId = useWatch({
    control: methods.control,
    name: "vehicle",
  });
  const tripId = useWatch({
    control: methods.control,
    name: "trip",
  });
  const checkedCount = INSPECTION_ITEMS.filter(
    (item) => goodMap[item.id],
  ).length;
  const progress = Math.round((checkedCount / INSPECTION_ITEMS.length) * 100);

  const onSubmit = (data: {
    vehicle: string | undefined;
    odometerReading: string;
  }) => {
    console.log("onSubmit", data);
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
                Complete your {mode === "pre-trip" ? "pre-trip" : "post-trip"}{" "}
                checklist
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
              <Clock3 className="w-4 h-4 text-gray-400" />
              <span className="text-base sm:text-base font-medium text-gray-700">
                {now}
              </span>
            </div>
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
                    value={odometerReading}
                    onChange={(e) => setOdometerReading(e.target.value)}
                    placeholder="e.g. 102545"
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-base text-gray-800 outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-300"
                  />
                </div>
              </label>
            </div>

            {vehicleId && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-end">
                  <label className="block">
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      Trip
                    </p>
                    <Controller
                      name="trip"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          options={tripOptions}
                          onChange={(option) => {
                            field.onChange(option.value);
                          }}
                          value={field.value}
                          className="mt-2 w-full"
                          buttonClassName="px-3 py-2.5 bg-gray-50"
                        />
                      )}
                    />
                  </label>

                  <div className="bg-gray-50 rounded-xl p-1 inline-flex gap-1">
                    <button
                      type="button"
                      onClick={() => setMode("pre_trip")}
                      className={`px-4 py-2 rounded-lg text-base font-semibold transition ${
                        mode === "pre_trip"
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-white"
                      }`}
                    >
                      Pre-Trip Inspection
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("post_trip")}
                      className={`px-4 py-2 rounded-lg text-base font-semibold transition ${
                        mode === "post_trip"
                          ? "bg-sky-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-white"
                      }`}
                    >
                      Post-Trip Inspection
                    </button>
                  </div>
                </div>
              </div>
            )}

            {tripId && (
              <VehicleInspection
                progress={progress}
                goodMap={goodMap}
                addedMap={addedMap}
                commentsMap={commentsMap}
                setGoodMap={setGoodMap}
                setAddedMap={setAddedMap}
                setCommentsMap={setCommentsMap}
              />
            )}

            {tripId && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {checkedCount} of {INSPECTION_ITEMS.length} items marked good
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-base font-semibold hover:from-emerald-600 hover:to-teal-600 transition"
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
