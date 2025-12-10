// src/pages/MealDetailsPage/MealDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import ReviewSection from "./ReviewSection/ReviewSection";

const MealDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to login if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  // Fetch meal by ID
  const { data: meal, isLoading, isError } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/add-food/${id}`
      );
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-center text-red-500">Error loading meal.</div>;
  if (!meal) return <div className="text-center">Meal not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-4">{meal.foodName}</h1>
      <img
        src={meal.foodImage}
        alt={meal.foodName}
        className="w-full h-96 object-cover rounded-xl mb-4"
      />
      <div className="space-y-2 text-gray-700">
        <p><strong>Chef Name:</strong> {meal.chefName}</p>
        <p><strong>Chef ID:</strong> {meal.chefId}</p>
        <p><strong>Price:</strong> ${meal.price}</p>
        <p><strong>Rating:</strong> {meal.rating}</p>
        <p><strong>Ingredients:</strong> {meal.ingredients.join(", ")}</p>
        <p><strong>Delivery Area:</strong> {meal.deliveryArea || "All Areas"}</p>
        <p><strong>Estimated Delivery Time:</strong> {meal.estimatedDeliveryTime}</p>
        <p><strong>Chef Experience:</strong> {meal.chefExperience}</p>
      </div>

      <button
        onClick={() => navigate(`/order/${meal._id}`)}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
      >
        Order Now
      </button>
     <ReviewSection></ReviewSection>
    </div>
  );
};

export default MealDetailsPage;
