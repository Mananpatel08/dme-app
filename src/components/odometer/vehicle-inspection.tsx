"use client";

import React, { Dispatch, SetStateAction, useMemo } from "react";
import { SectionBlock } from "./section-block";
import { Fuel, ShieldCheck, Wrench } from "lucide-react";
import { INSPECTION_ITEMS } from "@/utils/constants";

interface VehicleInspectionProps {
  progress: number;
  goodMap: Record<string, boolean>;
  addedMap: Record<string, boolean>;
  commentsMap: Record<string, string>;
  setGoodMap: Dispatch<SetStateAction<Record<string, boolean>>>;
  setAddedMap: Dispatch<SetStateAction<Record<string, boolean>>>;
  setCommentsMap: Dispatch<SetStateAction<Record<string, string>>>;
}
export const VehicleInspection = ({
  progress,
  goodMap,
  addedMap,
  commentsMap,
  setGoodMap,
  setAddedMap,
  setCommentsMap,
}: VehicleInspectionProps) => {

  const groupedItems = useMemo(
    () => ({
      fluids: INSPECTION_ITEMS.filter((item) => item.group === "fluids"),
      safety: INSPECTION_ITEMS.filter((item) => item.group === "safety"),
      exterior: INSPECTION_ITEMS.filter((item) => item.group === "exterior"),
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

      <SectionBlock
        title="Fluids"
        icon={<Fuel className="w-4 h-4 text-amber-500" />}
        items={groupedItems.fluids}
        goodMap={goodMap}
        addedMap={addedMap}
        commentsMap={commentsMap}
        onGoodChange={(id, value) =>
          setGoodMap((prev) => ({ ...prev, [id]: value }))
        }
        onAddedChange={(id, value) =>
          setAddedMap((prev) => ({ ...prev, [id]: value }))
        }
        onCommentChange={(id, value) =>
          setCommentsMap((prev) => ({ ...prev, [id]: value }))
        }
      />

      <SectionBlock
        title="Safety"
        icon={<ShieldCheck className="w-4 h-4 text-emerald-500" />}
        items={groupedItems.safety}
        goodMap={goodMap}
        addedMap={addedMap}
        commentsMap={commentsMap}
        onGoodChange={(id, value) =>
          setGoodMap((prev) => ({ ...prev, [id]: value }))
        }
        onAddedChange={(id, value) =>
          setAddedMap((prev) => ({ ...prev, [id]: value }))
        }
        onCommentChange={(id, value) =>
          setCommentsMap((prev) => ({ ...prev, [id]: value }))
        }
        isAddedColumn={false}
      />

      <SectionBlock
        title="Exterior & Compliance"
        icon={<Wrench className="w-4 h-4 text-blue-500" />}
        items={groupedItems.exterior}
        goodMap={goodMap}
        addedMap={addedMap}
        commentsMap={commentsMap}
        onGoodChange={(id, value) =>
          setGoodMap((prev) => ({ ...prev, [id]: value }))
        }
        onAddedChange={(id, value) =>
          setAddedMap((prev) => ({ ...prev, [id]: value }))
        }
        onCommentChange={(id, value) =>
          setCommentsMap((prev) => ({ ...prev, [id]: value }))
        }
        isAddedColumn={false}
      />
    </div>
  );
};
