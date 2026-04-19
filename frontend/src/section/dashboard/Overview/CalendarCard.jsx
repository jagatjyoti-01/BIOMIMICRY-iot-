import React from "react";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const dates = [
  "", "", "", "01", "02", "03", "04",
  "05", "06", "07", "08", "09", "10", "11",
  "12", "13", "14", "15", "16", "17", "18",
  "19", "20", "21", "22", "23", "24", "25",
  "26", "27", "28", "29", "30", "", "",
];

const CalendarCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[#0f172a]">Appointments</h3>

        <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
          <option>Apr</option>
        </select>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-sm text-gray-500 mb-2">
        {days.map((d) => (
          <span key={d} className="text-center">{d}</span>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-2 text-sm">

        {dates.map((date, i) => (
          <div
            key={i}
            className={`text-center py-1 rounded-md cursor-pointer
              ${date === "14" ? "bg-[#4f46e5] text-white" : "text-gray-700"}
              ${date === "" ? "opacity-0" : ""}
            `}
          >
            {date}
          </div>
        ))}

      </div>
    </div>
  );
};

export default CalendarCard;