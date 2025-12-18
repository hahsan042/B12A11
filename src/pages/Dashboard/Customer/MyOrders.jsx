


// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import CustomerOrderDataRow from '../../../components/Dashboard/TableRows/CustomerOrderDataRow';
// import useAuth from '../../../hooks/useAuth';
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

// const MyOrders = () => {
//   const { user } = useAuth();

//   const { data: orders, isLoading, isError, refetch } = useQuery({
//     queryKey: ['orders', user?.email],
//     queryFn: async () => {
//       const token = await user.getIdToken();
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders?email=${user.email}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.data;
//     },
//     enabled: !!user,
//   });

//   if (isLoading) return <LoadingSpinner />;
//   if (isError) return <div className="text-red-500 text-center">Failed to load orders.</div>;

//   return (
//     <div className="container mx-auto px-4 sm:px-8">
//       <div className="py-8">
//         <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//           <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//             <table className="min-w-full leading-normal">
//               <thead>
//                 <tr>
//                   <th>Image</th>
//                   <th>Name</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Status</th>
//                   <th>Payment</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.length > 0 ? (
//                   orders.map((order) => (
//                     <CustomerOrderDataRow
//                       key={order._id}
//                       order={order}
//                       refetchOrders={refetch} // ✅ Refetch on demand
//                     />
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center py-4">
//                       No orders found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;




import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CustomerOrderDataRow from '../../../components/Dashboard/TableRows/CustomerOrderDataRow';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyOrders = () => {
  const { user } = useAuth();

  const { data: orders, isLoading, isError, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders?email=${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 text-center">Failed to load orders.</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600">Image</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600">Name</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600">Price</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600">Quantity</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600">Status</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600">Payment</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <CustomerOrderDataRow
                      key={order._id}
                      order={order}
                      refetchOrders={refetch} // Refetch orders on update
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
