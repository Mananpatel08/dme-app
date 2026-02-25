import { InspectionItem, TripInspectionFormValues } from "@/types";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface SectionBlockProps {
  title: string;
  icon: React.ReactNode;
  name: "fluids" | "general";
  control: Control<TripInspectionFormValues>;
  items: InspectionItem[];
  isAddedColumn?: boolean;
  startIndex?: number;
}

export const SectionBlock = ({
  title,
  icon,
  name,
  control,
  items,
  isAddedColumn = true,
  startIndex = 0,
}: SectionBlockProps) => {
  return (
    <section className="mb-5 last:mb-0">
      <div className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5 border border-gray-100 mb-3">
        {icon}
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100 vertical-scrollbar scrollbar-sm">
        <table className="w-full min-w-[740px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 px-3 py-2.5">
                Item
              </th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 px-3 py-2.5 w-28">
                Good?
              </th>
              {isAddedColumn && (
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 px-3 py-2.5 w-28">
                  Added?
                </th>
              )}
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 px-3 py-2.5">
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const fieldIndex = startIndex + index;

              return (
              <tr key={`${item.id}-${fieldIndex}`} className="border-t border-gray-100 bg-white">
                <td className="px-3 py-2.5 text-sm text-gray-800">
                  {item.label}
                </td>
                <td className="px-3 py-2.5">
                  <label className="inline-flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                    <Controller
                      name={`${name}.${fieldIndex}.status`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value === 1}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? 1 : 0)
                          }
                          className="w-4 h-4 rounded border-gray-300 text-emerald-500"
                        />
                      )}
                    />
                    Yes
                  </label>
                </td>
                {isAddedColumn && name === "fluids" && (
                  <td className="px-3 py-2.5">
                    <label className="inline-flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                      <Controller
                        name={`${name}.${fieldIndex}.added`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-sky-500"
                          />
                        )}
                      />
                      Added
                    </label>
                  </td>
                )}
                <td className="px-3 py-2.5">
                  <Controller
                    name={`${name}.${fieldIndex}.comments`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        placeholder="Add note (optional)"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2"
                      />
                    )}
                  />
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </section>
  );
};
