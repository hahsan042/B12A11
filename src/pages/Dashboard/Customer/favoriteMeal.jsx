import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const FavoriteMeals = () => {
  const { user } = useAuth();

  const { data: favorites = [], isLoading, refetch } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites?email=${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const token = await user.getIdToken();

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/favorites/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    Swal.fire("Removed!", "Meal removed from favorites successfully.", "success");
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Favorite Meals</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite meals found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Meal Name</th>
              <th className="p-3 text-left">Chef Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((fav) => (
              <tr key={fav._id} className="border-t">
                <td className="p-3">{fav.foodName}</td>
                <td className="p-3">{fav.chefName}</td>
                <td className="p-3">${fav.price || "N/A"}</td>
                <td className="p-3">
                  {new Date(fav.addedTime).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(fav._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FavoriteMeals;
