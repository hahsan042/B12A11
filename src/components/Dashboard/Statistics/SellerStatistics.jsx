import { FaChartLine } from "react-icons/fa";

const SellerStatistics = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg">
        <FaChartLine className="text-6xl text-green-500" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Seller Statistics
        </h2>
        <p className="text-gray-500 text-center">
          This section is coming soon. Here you will see insights about your sales, orders, and performance!
        </p>
      </div>
    </div>
  );
};

export default SellerStatistics;
