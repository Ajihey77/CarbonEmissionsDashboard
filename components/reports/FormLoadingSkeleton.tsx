export const FormLoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i}>
        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
        <div
          className={`h-${i === 3 ? "32" : "10"} bg-gray-200 rounded w-full`}
        ></div>
      </div>
    ))}
  </div>
);
