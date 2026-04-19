import React from "react";

const StatsCard = ({
  title,
  value,
  percentage,
  icon,
  iconBg = "#4f46e5",
  graphType = "bar",
}) => {
  const isNegative = percentage?.includes("-");

  const renderGraph = () => {
    switch (graphType) {
      case "bar":
        return (
          <div className="flex items-end gap-[3px] h-10">
            {[30, 50, 35, 70, 40, 65].map((h, i) => (
              <div
                key={i}
                className="w-[3px] rounded bg-blue-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        );

      case "line":
        return (
          <svg width="80" height="40">
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              points="0,30 15,25 30,28 45,15 60,20 75,10"
            />
          </svg>
        );

      case "area":
        return (
          <svg width="80" height="40">
            <path
              d="M0 30 L15 25 L30 28 L45 15 L60 20 L75 10 L75 40 L0 40 Z"
              fill="#3b82f6"
              opacity="0.2"
            />
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              points="0,30 15,25 30,28 45,15 60,20 75,10"
            />
          </svg>
        );

      case "wave":
        return (
          <svg width="80" height="40">
            <path
              d="M0 25 Q15 10 30 20 T60 15 T80 20"
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
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition relative">

      {/* TOP */}
      <div className="flex justify-between items-start">
        
        {/* ICON */}
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center text-white"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>

        {/* PERCENT */}
        <div className="flex flex-col items-end">
          {percentage && (
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                isNegative
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {percentage}
            </span>
          )}
          <span className="text-xs text-gray-400 mt-1">
            Last 7 days
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-4">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">
          {value}
        </h2>
      </div>

      {/* GRAPH */}
      <div className="absolute bottom-4 right-4 opacity-80">
        {renderGraph()}
      </div>
    </div>
  );
};

export default StatsCard;