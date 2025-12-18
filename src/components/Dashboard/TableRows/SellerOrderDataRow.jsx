


// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const SellerOrderDataRow = ({ order, refetch }) => {
//   const axiosSecure = useAxiosSecure();

//   const updateStatus = async (status) => {
//     try {
//       await axiosSecure.patch(`/orders/${order._id}/status`, { status });
//       refetch();
//     } catch (err) {
//       console.error(err.response?.data || err);
//     }
//   };

//   const isCancelled = order.orderStatus === 'cancelled';
//   const isAccepted = order.orderStatus === 'accepted';
//   const isDelivered = order.orderStatus === 'delivered';

//   return (
//     <tr>
//       <td>{order.mealName}</td>
//       <td>{order.userEmail}</td>
//       <td>${order.price}</td>
//       <td>{order.quantity}</td>
//       <td>{order.userAddress}</td>
//       <td>{order.orderStatus}</td>
//       <td>{order.paymentStatus}</td>
//       <td className="flex gap-2">
//         <button
//           disabled={isCancelled || isDelivered}
//           onClick={() => updateStatus('cancelled')}
//           className="btn btn-sm bg-red-500 text-white disabled:opacity-50"
//         >
//           Cancel
//         </button>

//         <button
//           disabled={isAccepted || isCancelled || isDelivered}
//           onClick={() => updateStatus('accepted')}
//           className="btn btn-sm bg-green-500 text-white disabled:opacity-50"
//         >
//           Accept
//         </button>

//         <button
//           disabled={!isAccepted}
//           onClick={() => updateStatus('delivered')}
//           className="btn btn-sm bg-blue-500 text-white disabled:opacity-50"
//         >
//           Deliver
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default SellerOrderDataRow;



import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheckCircle, FaTimesCircle, FaTruck } from 'react-icons/fa';

const SellerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const updateStatus = async (status) => {
    try {
      await axiosSecure.patch(`/orders/${order._id}/status`, { status });
      refetch();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const isCancelled = order.orderStatus === 'cancelled';
  const isAccepted = order.orderStatus === 'accepted';
  const isDelivered = order.orderStatus === 'delivered';

  return (
    <tr className="hover:bg-gray-50 transition duration-200">
      {/* Meal Name */}
      <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.mealName}</td>
      
      {/* User Email */}
      <td className="py-4 px-6 text-sm text-gray-600">{order.userEmail}</td>
      
      {/* Price */}
      <td className="py-4 px-6 text-sm text-gray-600">${order.price}</td>
      
      {/* Quantity */}
      <td className="py-4 px-6 text-sm text-gray-600">{order.quantity}</td>
      
      {/* User Address */}
      <td className="py-4 px-6 text-sm text-gray-600">{order.userAddress}</td>
      
      {/* Order Status */}
      <td className="py-4 px-6 text-sm text-center">
        <span
          className={`badge ${
            order.orderStatus === 'cancelled'
              ? 'bg-red-500'
              : order.orderStatus === 'accepted'
              ? 'bg-green-500'
              : order.orderStatus === 'delivered'
              ? 'bg-blue-500'
              : 'bg-gray-500'
          } text-white`}
        >
          {order.orderStatus}
        </span>
      </td>
      
      {/* Payment Status */}
      <td className="py-4 px-6 text-sm text-center">
        <span
          className={`badge ${
            order.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'
          } text-white`}
        >
          {order.paymentStatus}
        </span>
      </td>
      
      {/* Action Buttons */}
      <td className="py-4 px-6 text-sm flex justify-center gap-3">
        {/* Cancel Button */}
        <button
          disabled={isCancelled || isDelivered}
          onClick={() => updateStatus('cancelled')}
          className={`btn btn-sm ${isCancelled || isDelivered ? 'bg-gray-400' : 'bg-red-500'} text-white rounded-md px-4 py-2 flex items-center justify-center space-x-2 disabled:opacity-50 transition-all duration-200`}
          title="Cancel Order"
        >
          <FaTimesCircle />
          <span>Cancel</span>
        </button>

        {/* Accept Button */}
        <button
          disabled={isAccepted || isCancelled || isDelivered}
          onClick={() => updateStatus('accepted')}
          className={`btn btn-sm ${isAccepted || isCancelled || isDelivered ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-md px-4 py-2 flex items-center justify-center space-x-2 disabled:opacity-50 transition-all duration-200`}
          title="Accept Order"
        >
          <FaCheckCircle />
          <span>Accept</span>
        </button>

        {/* Deliver Button */}
        <button
          disabled={!isAccepted}
          onClick={() => updateStatus('delivered')}
          className={`btn btn-sm ${!isAccepted ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md px-4 py-2 flex items-center justify-center space-x-2 disabled:opacity-50 transition-all duration-200`}
          title="Mark as Delivered"
        >
          <FaTruck />
          <span>Deliver</span>
        </button>
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
