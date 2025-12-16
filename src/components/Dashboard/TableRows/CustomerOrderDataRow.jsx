import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import DeleteModalOrder from '../../Modal/DeleteModalOrder';


const CustomerOrderDataRow = ({ order, refetchOrders }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mealImage, setMealImage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const closeModal = () => setIsOpen(false);

  // Fetch all meals to get the image for the current order
  const { data: meals } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/add-food`);
      return res.data;
    },
  });
  console.log(meals);
  

  // Set meal image based on foodId
  useEffect(() => {
    if (meals && order) {
      const meal = meals.find((m) => m._id === order.foodId);
      if (meal) setMealImage(meal.foodImage || '');
    }
  }, [meals, order]);

  // Payment handler
// const handlePayment = async () => {
//   const paymentInfo = {
//     orderId: order._id,
//     mealName: order.mealName,
//     amount: order.price,
//     quantity: order.quantity,
//     seller: {
//       name: order.sellerName,
//       email: order.sellerEmail,
//     },
//     customer: {
//       name: user?.displayName || user?.name,
//       email: user?.email,
//       image: user?.photoURL || '',
//     },
//   };

//   console.log('Payment Info:', paymentInfo); // <-- check here

//   try {
//     const res = await axios.post(
//       `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//       paymentInfo
//     );
//     console.log('Response from server:', res.data);

//     // Redirect to Stripe Checkout if you integrate Stripe
//     // window.location.href = res.data.url;
//   } catch (err) {
//     console.error(err);
//     alert('Payment initiation failed!');
//   }
// };

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
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );

    // Redirect to Stripe checkout
    window.location.href = res.data.url;
  } catch (err) {
    console.error(err);
    alert('Payment initiation failed!');
  }
};




  return (
    <tr>
      {/* Meal Image */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt={order.mealName}
                src={mealImage || 'https://i.ibb.co/5GqkxZ4/default-food.jpg'}
                className="mx-auto object-cover rounded h-10 w-15"
              />
            </div>
          </div>
        </div>
      </td>

      {/* Meal Info */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {order.mealName}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        ${order.price}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {order.quantity}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {order.orderStatus}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {order.paymentStatus}
      </td>

      {/* Actions */}
      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">





  {order.paymentStatus === 'paid' ? (
    <span className="text-green-600 font-semibold">Paid</span>
  ) : (
    <button
      onClick={handlePayment}
      className="px-3 py-1 bg-green-500 text-white rounded"
    >
      Pay
    </button>
  )}




        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>

        <DeleteModalOrder
          isOpen={isOpen}
          closeModal={closeModal}
          orderId={order._id}
          user={user}
          refetchOrders={refetchOrders}
        />
      </td> */}


      {/* Actions */}
<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">

  {order.orderStatus.toLowerCase() === 'accepted' && order.paymentStatus === 'pending' ? (
    <button
      onClick={handlePayment}
      className="px-3 py-1 bg-green-500 text-white rounded"
    >
      Pay
    </button>
  ) : order.paymentStatus === 'paid' ? (
    <span className="text-green-600 font-semibold">Paid</span>
  ) : null}

  <button
    onClick={() => setIsOpen(true)}
    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
  >
    Cancel
  </button>

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



