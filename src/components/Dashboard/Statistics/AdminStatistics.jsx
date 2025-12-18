// import { useQuery } from "@tanstack/react-query";
// import { FaUserAlt, FaDollarSign } from "react-icons/fa";
// import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const AdminStatistics = () => {
//   const axiosSecure = useAxiosSecure();

//   // Fetch statistics from backend
//   const { data: stats = {}, isLoading, isError } = useQuery({
//     queryKey: ["admin-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/admin/statistics");
//       return res.data;
//     },
//   });

//   if (isLoading) return <p className="text-center mt-20">Loading statistics...</p>;
//   if (isError) return <p className="text-center mt-20 text-red-500">Failed to load statistics</p>;

//   // Destructure data
//   const {
//     totalUsers = 0,
//     totalOrders = 0,
//     totalPlants = 0,
//     totalRevenue = 0,
//   } = stats;

//   return (
//     <div className="mt-12">
//       {/* Small cards */}
//       <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {/* Total Revenue */}
//         <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md">
//           <div className="absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-lg">
//             <FaDollarSign className="w-6 h-6" />
//           </div>
//           <div className="p-4 text-right">
//             <p className="text-sm text-gray-500">Total Revenue</p>
//             <h4 className="text-2xl font-semibold">৳{totalRevenue}</h4>
//           </div>
//         </div>

//         {/* Total Orders */}
//         <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md">
//           <div className="absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-lg">
//             <BsFillCartPlusFill className="w-6 h-6" />
//           </div>
//           <div className="p-4 text-right">
//             <p className="text-sm text-gray-500">Total Orders</p>
//             <h4 className="text-2xl font-semibold">{totalOrders}</h4>
//           </div>
//         </div>

//         {/* Total Plants */}
//         <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md">
//           <div className="absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-lg">
//             <BsFillHouseDoorFill className="w-6 h-6" />
//           </div>
//           <div className="p-4 text-right">
//             <p className="text-sm text-gray-500">Total Plants</p>
//             <h4 className="text-2xl font-semibold">{totalPlants}</h4>
//           </div>
//         </div>

//         {/* Total Users */}
//         <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md">
//           <div className="absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-lg">
//             <FaUserAlt className="w-6 h-6" />
//           </div>
//           <div className="p-4 text-right">
//             <p className="text-sm text-gray-500">Total Users</p>
//             <h4 className="text-2xl font-semibold">{totalUsers}</h4>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStatistics;


import { useQuery } from "@tanstack/react-query";
import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading, isError } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-20">Loading statistics...</p>;
  if (isError) return <p className="text-center mt-20 text-red-500">Failed to load statistics</p>;

  const {
    totalUsers = 0,
    totalOrders = 0,
    totalPlants = 0,
    totalRevenue = 0,
    ordersPending = 0,
    ordersDelivered = 0
  } = stats;

  // Data for charts
  const ordersData = [
    { name: "Pending", value: ordersPending },
    { name: "Delivered", value: ordersDelivered },
  ];

  const revenueData = [
    { name: "Revenue", value: totalRevenue },
    { name: "Remaining Orders", value: totalOrders - ordersDelivered },
  ];

  return (
    <div className="mt-12">
      {/* Small cards */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard title="Total Revenue" value={`৳${totalRevenue}`} icon={<FaDollarSign />} from="orange" />
        <StatCard title="Total Orders" value={totalOrders} icon={<BsFillCartPlusFill />} from="blue" />
        <StatCard title="Orders Pending" value={ordersPending} icon={<BsFillCartPlusFill />} from="yellow" />
        <StatCard title="Orders Delivered" value={ordersDelivered} icon={<BsFillCartPlusFill />} from="teal" />
        <StatCard title="Total Plants" value={totalPlants} icon={<BsFillHouseDoorFill />} from="pink" />
        <StatCard title="Total Users" value={totalUsers} icon={<FaUserAlt />} from="green" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bar Chart for Orders */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Orders Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Revenue */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, from }) => (
  <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md">
    <div className={`absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-tr from-${from}-600 to-${from}-400 text-white shadow-lg`}>
      {icon}
    </div>
    <div className="p-4 text-right">
      <p className="text-sm text-gray-500">{title}</p>
      <h4 className="text-2xl font-semibold">{value}</h4>
    </div>
  </div>
);

export default AdminStatistics;
