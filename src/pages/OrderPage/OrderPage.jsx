import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const OrderPage = () => {
  const { id } = useParams(); // meal id from URL
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  // Fetch meal details
  const {
    data: meal,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/add-food/${id}`
      );
      return res.data;
    },
    enabled: !!id,
  });

  // Update total price whenever quantity or meal changes
  useEffect(() => {
    if (meal) setTotalPrice(meal.price * quantity);
  }, [meal, quantity]);

  // Mutation for order submission
const orderMutation = useMutation({
  mutationFn: async (orderData) => {
    const token = await user.getIdToken();
    return await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  onSuccess: () => {
    // Success হলে SweetAlert দেখাবে এবং redirect করবে
    Swal.fire("Success!", "Order placed successfully!", "success").then(() => {
      navigate("/dashboard/my-orders"); // <-- এখানে redirect হচ্ছে
    });
  },
  onError: (err) => {
    Swal.fire("Error!", "Failed to place order.", "error");
    console.log(err);
  },
});


  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load meal details.</div>
    );
  if (!meal) return <div className="text-center">Meal not found.</div>;

  // Confirm order function
  const handleConfirmOrder = async () => {
    const result = await Swal.fire({
      title: `Your total price is $${totalPrice}`,
      text: "Do you want to confirm the order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const orderData = {
        foodId: meal._id,
        mealName: meal.foodName,
        price: meal.price,
        quantity,
        chefId: meal.chefId,
        paymentStatus: "Pending",
        userEmail: user.email,
        userAddress,
        orderStatus: "pending",
        orderTime: new Date().toISOString(),
      };

      orderMutation.mutate(orderData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Confirm Your Order</h1>

      <div className="space-y-4">
        <div>
          <label className="font-semibold">Meal Name:</label>
          <input
            type="text"
            value={meal.foodName}
            readOnly
            className="border w-full p-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Price (per unit):</label>
          <input
            type="number"
            value={meal.price}
            readOnly
            className="border w-full p-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Quantity:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border w-full p-2 rounded"
          />

          {/* Total Price */}
          <p className="text-lg font-semibold mt-2">
            Total Price: ${totalPrice}
          </p>
        </div>

        <div>
          <label className="font-semibold">Delivery Address:</label>
          <textarea
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="Enter your delivery address"
            className="border w-full p-2 rounded"
            required
          ></textarea>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
