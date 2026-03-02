"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export type TabItem<T extends string> = {
  value: T;
  label: string;
  icon?: LucideIcon;
  count?: number;
};

type TabSwitcherProps<T extends string> = {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (value: T) => void;
};

export function TabSwitcher<T extends string>({
  tabs,
  activeTab,
  onChange,
}: TabSwitcherProps<T>) {
  return (
    <div className="bg-white rounded-2xl border-[0.5px] border-gray-300 p-1.5">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          const Icon = tab.icon;

          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {tab.label}

              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
