const SensorGrid = ({ device }) => {
  const sensors = [
    { name: "pH", value: device.ph },
    { name: "COD", value: device.cod },
    { name: "BOD", value: device.bod },
    { name: "Turbidity", value: device.turbidity },
    { name: "Power", value: device.power },
    { name: "Volume", value: device.totalVolume },

    { name: "pH(d)", value: device.ph_d },
    { name: "TDS(d)", value: device.tds_d },
    { name: "Turbidity(d)", value: device.turbidity_d },
    { name: "Chlorine(d)", value: device.chlorine_d },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">

      {sensors.map((item, i) => (
        <div
          key={i}
          className="bg-white border rounded-lg p-3 text-center shadow-sm"
        >
          <p className="text-xs text-gray-500">{item.name}</p>
          <h3 className="text-lg font-semibold text-gray-800">
            {item.value}
          </h3>
        </div>
      ))}

    </div>
  );
};

export default SensorGrid;