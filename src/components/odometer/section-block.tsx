import { InspectionItem } from "@/types";
import React from "react";

interface SectionBlockProps {
  title: string;
  icon: React.ReactNode;
  items: InspectionItem[];
  goodMap: Record<string, boolean>;
  addedMap: Record<string, boolean>;
  commentsMap: Record<string, string>;
  onGoodChange: (id: string, value: boolean) => void;
  onAddedChange: (id: string, value: boolean) => void;
  onCommentChange: (id: string, value: string) => void;
  isAddedColumn?: boolean;
}

export const SectionBlock = ({
  title,
  icon,
  items,
  goodMap,
  addedMap,
  commentsMap,
  onGoodChange,
  onAddedChange,
  onCommentChange,
  isAddedColumn = true,
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
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 bg-white">
                <td className="px-3 py-2.5 text-sm text-gray-800">
                  {item.label}
                </td>
                <td className="px-3 py-2.5">
                  <label className="inline-flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(goodMap[item.id])}
                      onChange={(e) => onGoodChange(item.id, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-400"
                    />
                    Yes
                  </label>
                </td>
                {isAddedColumn && (
                  <td className="px-3 py-2.5">
                    <label className="inline-flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(addedMap[item.id])}
                        onChange={(e) =>
                          onAddedChange(item.id, e.target.checked)
                        }
                        className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400"
                      />
                      Added
                    </label>
                  </td>
                )}
                <td className="px-3 py-2.5">
                  <input
                    type="text"
                    value={commentsMap[item.id] ?? ""}
                    onChange={(e) => onCommentChange(item.id, e.target.value)}
                    placeholder="Add note (optional)"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2 text-base text-gray-800 outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
