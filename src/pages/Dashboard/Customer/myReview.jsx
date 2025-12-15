import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { AiFillStar } from "react-icons/ai";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();

  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/reviews?email=${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const token = await user.getIdToken();

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Deleted!", "Review removed successfully.", "success");
      refetch();
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Failed to delete review.", "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <AiFillStar className="text-yellow-500" /> My Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-4 bg-white rounded-xl shadow flex justify-between items-start"
            >
              <div>
                <h4 className="font-semibold">{rev.foodName}</h4>
                <p className="text-yellow-500 flex items-center gap-1">
                  <AiFillStar /> {rev.rating}
                </p>
                <p className="mt-1 text-gray-600">{rev.comment}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(rev.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(rev._id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
