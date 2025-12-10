import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Card = () => {
  // Fetch all meals from backend
  const { data: meals, isLoading, isError } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/add-food`);
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 text-center">Error fetching meals.</div>;

  return (
    <>
      {meals.length === 0 && <div className="col-span-full text-center text-gray-500">No meals available.</div>}

      {meals.map((meal) => (
        <div
          key={meal._id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
        >
          {/* Food Image */}
          <div className="relative w-full h-64 overflow-hidden">
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Meal Info */}
          <div className="p-5 flex flex-col gap-2">
            <h3 className="text-xl font-bold text-gray-800">{meal.foodName}</h3>
            <p className="text-gray-600 font-medium">Chef: {meal.chefName}</p>
            <p className="text-gray-500 text-sm">Chef ID: {meal.chefId}</p>

            <div className="flex items-center justify-between mt-2">
              <span className="text-green-600 font-semibold text-lg">${meal.price}</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm font-medium">
                ⭐ {meal.rating}
              </span>
            </div>

            <p className="text-gray-500 mt-2 text-sm">
              Delivery Area: {meal.deliveryArea || "All Areas"}
            </p>

            <Link
              to={`/meals/${meal._id}`}
              className="mt-4 w-full text-center py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition-colors duration-300"
            >
              See Details
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
