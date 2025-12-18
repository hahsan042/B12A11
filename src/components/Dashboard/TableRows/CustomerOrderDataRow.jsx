// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import useAuth from '../../../hooks/useAuth';
// import DeleteModalOrder from '../../Modal/DeleteModalOrder';


// const CustomerOrderDataRow = ({ order, refetchOrders }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [mealImage, setMealImage] = useState('');
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const closeModal = () => setIsOpen(false);

//   // Fetch all meals to get the image for the current order
//   const { data: meals } = useQuery({
//     queryKey: ['meals'],
//     queryFn: async () => {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/add-food`);
//       return res.data;
//     },
//   });
//   console.log(meals);
  

//   // Set meal image based on foodId
//   useEffect(() => {
//     if (meals && order) {
//       // const meal = meals.find((m) => m._id === order.foodId);
//       const meal = meals?.meals?.find(m => m._id === order.foodId);

//       if (meal) setMealImage(meal.foodImage || '');
//     }
//   }, [meals, order]);

//   // Payment handler


// const handlePayment = async () => {
//   const paymentInfo = {
//     orderId: order._id,
//     mealName: order.mealName,
//     mealImage: mealImage,
//     amount: order.price,
//     quantity: order.quantity,
//     customer: {
//       name: user?.displayName,
//       email: user?.email,
//       image: user?.photoURL,
//     },
//   };

//   try {
//     const res = await axios.post(
//       `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//       paymentInfo
//     );

//     // Redirect to Stripe checkout
//     window.location.href = res.data.url;
//   } catch (err) {
//     console.error(err);
//     alert('Payment initiation failed!');
//   }
// };




//   return (
//     <tr>
//       {/* Meal Image */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <div className="flex items-center">
//           <div className="shrink-0">
//             <div className="block relative">
//               <img
//                 alt={order.mealName}
//                 src={mealImage || 'https://i.ibb.co/5GqkxZ4/default-food.jpg'}
//                 className="mx-auto object-cover rounded h-10 w-15"
//               />
//             </div>
//           </div>
//         </div>
//       </td>

//       {/* Meal Info */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {order.mealName}
//       </td>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         ${order.price}
//       </td>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {order.quantity}
//       </td>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {order.orderStatus}
//       </td>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {order.paymentStatus}
//       </td>

//       {/* Actions */}
//       {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">





//   {order.paymentStatus === 'paid' ? (
//     <span className="text-green-600 font-semibold">Paid</span>
//   ) : (
//     <button
//       onClick={handlePayment}
//       className="px-3 py-1 bg-green-500 text-white rounded"
//     >
//       Pay
//     </button>
//   )}




//         <button
//           onClick={() => setIsOpen(true)}
//           className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Cancel
//         </button>

//         <DeleteModalOrder
//           isOpen={isOpen}
//           closeModal={closeModal}
//           orderId={order._id}
//           user={user}
//           refetchOrders={refetchOrders}
//         />
//       </td> */}


//       {/* Actions */}
// <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">

//   {order.orderStatus.toLowerCase() === 'accepted' && order.paymentStatus === 'pending' ? (
//     <button
//       onClick={handlePayment}
//       className="px-3 py-1 bg-green-500 text-white rounded"
//     >
//       Pay
//     </button>
//   ) : order.paymentStatus === 'paid' ? (
//     <span className="text-green-600 font-semibold"></span>
//   ) : null}

//   <button
//     onClick={() => setIsOpen(true)}
//     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//   >
//     Cancel
//   </button>

//   <DeleteModalOrder
//     isOpen={isOpen}
//     closeModal={closeModal}
//     orderId={order._id}
//     user={user}
//     refetchOrders={refetchOrders}
//   />
// </td>

//     </tr>
//   );
// };

// export default CustomerOrderDataRow;




import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';
import DeleteModalOrder from '../../Modal/DeleteModalOrder';
import useAuth from '../../../hooks/useAuth';

const CustomerOrderDataRow = ({ order, refetchOrders }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mealImage, setMealImage] = useState('');
  const { user } = useAuth();
  const closeModal = () => setIsOpen(false);

  // Fetch meal details for the current order
  useEffect(() => {
    const fetchMealImage = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/add-food`);
        const meal = res.data?.meals?.find((m) => m._id === order.foodId);
        if (meal) setMealImage(meal.foodImage || '');
      } catch (error) {
        console.error("Error fetching meal image", error);
      }
    };
    fetchMealImage();
  }, [order.foodId]);

  // Payment handler
  const handlePayment = async () => {
    const paymentInfo = {
      orderId: order._id,
      mealName: order.mealName,
      mealImage: mealImage,
      amount: order.price,
      quantity: order.quantity,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo);
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert('Payment initiation failed!');
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition duration-200">
      {/* Meal Image */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center justify-center">
          <img
            alt={order.mealName}
            src={mealImage || 'https://i.ibb.co/5GqkxZ4/default-food.jpg'}
            className="object-cover rounded h-14 w-20"
          />
        </div>
      </td>

      {/* Meal Info */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.mealName}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">${order.price}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.quantity}</td>

      {/* Order Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <span
          className={`text-sm font-semibold ${
            order.orderStatus === 'accepted'
              ? 'text-green-500'
              : order.orderStatus === 'cancelled'
              ? 'text-red-500'
              : 'text-gray-500'
          }`}
        >
          {order.orderStatus}
        </span>
      </td>

      {/* Payment Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <span
          className={`text-sm font-semibold ${
            order.paymentStatus === 'paid'
              ? 'text-green-500'
              : order.paymentStatus === 'pending'
              ? 'text-yellow-500'
              : 'text-gray-500'
          }`}
        >
          {order.paymentStatus}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-4 justify-center items-center">
        {order.orderStatus.toLowerCase() === 'accepted' && order.paymentStatus === 'pending' && (
          <button
            onClick={handlePayment}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-200"
            title="Pay Now"
          >
            <FaMoneyBillWave />
            <span>Pay</span>
          </button>
        )}
        {order.paymentStatus === 'paid' && (
          <span className="text-green-600 font-semibold"></span>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200"
          title="Cancel Order"
        >
          <FaTimesCircle />
          <span>Cancel</span>
        </button>

        {/* Delete Modal */}
        <DeleteModalOrder
          isOpen={isOpen}
          closeModal={closeModal}
          orderId={order._id}
          user={user}
          refetchOrders={refetchOrders}
        />
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;

