"use client";

import React, { useMemo, useState } from "react";
import {
  Ambulance,
  FilePenLine,
  Globe,
  MapPin,
  Signature,
  StickyNote,
  User,
} from "lucide-react";

const STATUS_OPTIONS = [
  "Enroute to Pickup",
  "Arrived at Pickup",
  "Passenger Onboard",
  "In Transit",
  "Arrived at Destination",
  "Trip Completed",
];

const DEMO_TRIP = {
  id: "TRP-17400-00",
  customerName: "Pabel Picasso",
  time: "17:00:00",
  pickup: "London",
  needs: "Wheelchair Assist",
  signatureRequired: true,
};

export const TripDetail = () => {
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [driverNote, setDriverNote] = useState("");
  const [hasSignature, setHasSignature] = useState(false);

  const updateDisabled = useMemo(() => {
    return DEMO_TRIP.signatureRequired && !hasSignature;
  }, [hasSignature]);

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className=" p-4 sm:p-6 space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Trip Detail
            </p>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-1">
              Update Trip Status
            </h2>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-semibold">
            {DEMO_TRIP.id}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:max-w-[14rem]">
          <button
            type="button"
            className="h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white inline-flex items-center justify-center transition-colors"
            aria-label="Vehicle"
          >
            <Ambulance className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white inline-flex items-center justify-center transition-colors"
            aria-label="Live Tracking"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white inline-flex items-center justify-center transition-colors"
            aria-label="Edit"
          >
            <FilePenLine className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Customer Name
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800 inline-flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              {DEMO_TRIP.customerName}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Time
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {DEMO_TRIP.time}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Pickup
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800 inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              {DEMO_TRIP.pickup}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Needs
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {DEMO_TRIP.needs}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 p-4 space-y-4 bg-gray-50">
          <label className="block">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Status
            </p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium inline-flex items-center gap-1.5">
              <StickyNote className="w-3.5 h-3.5" />
              Driver Notes
            </p>
            <textarea
              value={driverNote}
              onChange={(e) => setDriverNote(e.target.value)}
              rows={3}
              placeholder="Add notes for dispatch or billing (optional)"
              className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
            />
          </label>
        </div>

        {DEMO_TRIP.signatureRequired && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-amber-800 inline-flex items-center gap-2">
                <Signature className="w-4 h-4" />
                Customer signature is required before updating.
              </p>
              <label className="inline-flex items-center gap-2 text-sm text-amber-900">
                <input
                  type="checkbox"
                  checked={hasSignature}
                  onChange={(e) => setHasSignature(e.target.checked)}
                  className="rounded border-amber-400 text-amber-600 focus:ring-amber-400"
                />
                Signature captured
              </label>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            className="h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-4 text-sm font-semibold text-gray-700 transition-colors"
          >
            Back to List
          </button>
          <button
            type="button"
            disabled={updateDisabled}
            className="h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed px-4 text-sm font-semibold text-white transition-colors"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};
