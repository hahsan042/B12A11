// // import useAxiosSecure from '../../../hooks/useAxiosSecure';

// // const SellerOrderDataRow = ({ order, refetch }) => {
// //   const axiosSecure = useAxiosSecure();

// //   const updateStatus = async (status) => {
// //     try {
// //       await axiosSecure.patch(`/orders/${order._id}/status`, { status });
// //       refetch();
// //     } catch (err) {
// //       console.error(err.response?.data || err);
// //     }
// //   };

// //   const isCancelled = order.orderStatus === 'cancelled';
// //   const isAccepted = order.orderStatus === 'accepted';
// //   const isDelivered = order.orderStatus === 'delivered';

// //   return (
// //     <tr>
// //       <td>{order.mealName}</td>
// //       <td>${order.price}</td>
// //       <td>{order.quantity}</td>
// //       <td>{order.userEmail}</td>
// //       <td>{order.userAddress}</td>
// //       <td>{order.orderStatus}</td>
// //       <td>{order.paymentStatus}</td>
// //       <td className="flex gap-2">
// //         {/* Cancel Button */}
// //         <button
// //           disabled={isCancelled || isDelivered}
// //           onClick={() => updateStatus('cancelled')}
// //           className="btn btn-sm bg-red-500 text-white disabled:opacity-50"
// //         >
// //           Cancel
// //         </button>

// //         {/* Accept Button */}
// //         <button
// //           disabled={isAccepted || isCancelled || isDelivered}
// //           onClick={() => updateStatus('accepted')}
// //           className="btn btn-sm bg-green-500 text-white disabled:opacity-50"
// //         >
// //           Accept
// //         </button>

// //         {/* Deliver Button */}
// //         <button
// //           disabled={!isAccepted}
// //           onClick={() => updateStatus('delivered')}
// //           className="btn btn-sm bg-blue-500 text-white disabled:opacity-50"
// //         >
// //           Deliver
// //         </button>
// //       </td>
// //     </tr>
// //   );
// // };

// // export default SellerOrderDataRow;
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
    <tr>
      <td>{order.mealName}</td>
      <td>{order.userEmail}</td>
      <td>${order.price}</td>
      <td>{order.quantity}</td>
      <td>{order.userAddress}</td>
      <td>{order.orderStatus}</td>
      <td>{order.paymentStatus}</td>
      <td className="flex gap-2">
        <button
          disabled={isCancelled || isDelivered}
          onClick={() => updateStatus('cancelled')}
          className="btn btn-sm bg-red-500 text-white disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          disabled={isAccepted || isCancelled || isDelivered}
          onClick={() => updateStatus('accepted')}
          className="btn btn-sm bg-green-500 text-white disabled:opacity-50"
        >
          Accept
        </button>

        <button
          disabled={!isAccepted}
          onClick={() => updateStatus('delivered')}
          className="btn btn-sm bg-blue-500 text-white disabled:opacity-50"
        >
          Deliver
        </button>
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
