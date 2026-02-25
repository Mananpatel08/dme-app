import React from "react";
import { Control, Controller } from "react-hook-form";
import Dropdown, { DropdownOption } from "../ui/dropdown";
import { TripInspectionFormValues } from "@/types";

interface TripFieldProps {
  control: Control<TripInspectionFormValues>;
  tripOptions: DropdownOption[];
  mode: string;
  setMode: (mode: string) => void;
}

export const TripField = ({
  control,
  tripOptions,
  mode,
  setMode,
}: TripFieldProps) => {
  return (
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
  );
};
