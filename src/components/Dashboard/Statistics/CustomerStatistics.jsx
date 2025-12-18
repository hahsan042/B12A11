import { FaChartPie } from "react-icons/fa";

const CustomerStatistics = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg">
        <FaChartPie className="text-6xl text-blue-500" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Customer Statistics
        </h2>
        <p className="text-gray-500 text-center">
          This section is coming soon. Stay tuned for detailed insights about your activities and orders!
        </p>
      </div>
    </div>
  );
};

export default CustomerStatistics;
