"use client";

type TripCardSkeletonProps = {
  count?: number;
};

export const TripCardSkeleton = ({ count = 1 }: TripCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-300 p-4 animate-pulse"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-1.5" />
              <div className="h-3 bg-gray-100 rounded w-20" />
            </div>
            <div className="h-6 bg-gray-100 rounded-full w-20" />
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-gray-200" />
              <div className="w-0.5 h-6 bg-gray-100 my-0.5" />
              <div className="w-2 h-2 rounded-full bg-gray-200" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
