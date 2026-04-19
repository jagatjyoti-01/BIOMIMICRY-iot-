import React from "react";

const StatsCard = ({
  title,
  value,
  percentage,
  icon,
  iconBg = "#4f46e5",
  graphType = "bar", // bar | line | wave | area
  bg = "bg-01.svg",
}) => {
  const isNegative = percentage?.includes("-");

  // GRAPH TYPES
  const renderGraph = () => {
    switch (graphType) {
      case "bar":
        return (
          <div className="flex items-end gap-[3px] h-12">
            {[30, 50, 35, 70, 40, 65].map((h, i) => (
              <div
                key={i}
                className="w-[4px] rounded bg-indigo-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        );

      case "line":
        return (
          <svg width="90" height="40" viewBox="0 0 90 40">
            <polyline
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              points="0,30 15,25 30,28 45,15 60,20 75,10 90,15"
            />
          </svg>
        );

      case "area":
        return (
          <svg width="90" height="40" viewBox="0 0 90 40">
            <path
              d="M0 30 L15 25 L30 28 L45 15 L60 20 L75 10 L90 15 L90 40 L0 40 Z"
              fill="#6366f1"
              opacity="0.2"
            />
            <polyline
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              points="0,30 15,25 30,28 45,15 60,20 75,10 90,15"
            />
          </svg>
        );

      case "wave":
        return (
          <svg width="90" height="40" viewBox="0 0 90 40">
            <path
              d="M0 25 Q15 10 30 20 T60 15 T90 20"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-5 relative overflow-hidden"
      style={{
        backgroundImage: `url(/assets/${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
      }}
    >
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              isNegative
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {percentage}
          </span>

          <span className="text-xs text-gray-500">
            in last 7 Days
          </span>
        </div>
      </div>

      {/* TITLE */}
      <div className="mt-4">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          {value}
        </h2>
      </div>

      {/* GRAPH */}
      <div className="absolute bottom-4 right-4">
        {renderGraph()}
      </div>
    </div>
  );
};

export default StatsCard;