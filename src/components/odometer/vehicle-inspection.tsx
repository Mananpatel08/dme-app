"use client";

import React, { useMemo } from "react";
import { SectionBlock } from "./section-block";
import { Fuel, ShieldCheck, Wrench } from "lucide-react";
import { FLUIDS_ITEMS, GENERAL_ITEMS } from "@/utils/constants";
import { Control, useFormContext } from "react-hook-form";
import { TripInspectionFormValues } from "@/types";

interface VehicleInspectionProps {
  progress: number;
  control: Control<TripInspectionFormValues>;
}
export const VehicleInspection = ({
  progress,
  control,
}: VehicleInspectionProps) => {
  const {
    formState: { errors },
  } = useFormContext<TripInspectionFormValues>();

  const fluidsError =
    ((errors.fluids as any)?.message ||
      (errors.fluids as any)?.root?.message) as string | undefined;
  const generalError =
    ((errors.general as any)?.message ||
      (errors.general as any)?.root?.message) as string | undefined;

  const groupedItems = useMemo(
    () => ({
      fluids: FLUIDS_ITEMS,
      safety: GENERAL_ITEMS.filter((item) => item.group === "safety"),
      exterior: GENERAL_ITEMS.filter((item) => item.group === "exterior"),
    }),
    [],
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">
            Vehicle Inspection Checklist
          </h2>
          <p className="text-xs text-gray-500">
            Mark each item and leave comments where needed.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Completion</p>
          <p className="text-sm font-semibold text-gray-800">{progress}%</p>
        </div>
      </div>

      <div className="w-full h-2 rounded-full bg-gray-100 mb-5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {fluidsError && (
        <p className="text-xs text-red-500 mb-2">{fluidsError}</p>
      )}

      <SectionBlock
        title="Fluids"
        name="fluids"
        icon={<Fuel className="w-4 h-4 text-amber-500" />}
        items={groupedItems.fluids}
        control={control}
      />

      {generalError && (
        <p className="text-xs text-red-500 mb-2 mt-4">{generalError}</p>
      )}

      <SectionBlock
        title="Safety"
        name="general"
        icon={<ShieldCheck className="w-4 h-4 text-emerald-500" />}
        items={groupedItems.safety}
        isAddedColumn={false}
        control={control}
      />

      <SectionBlock
        title="Exterior & Compliance"
        name="general"
        icon={<Wrench className="w-4 h-4 text-blue-500" />}
        items={groupedItems.exterior}
        startIndex={groupedItems.safety.length}
        isAddedColumn={false}
        control={control}
      />
    </div>
  );
};
