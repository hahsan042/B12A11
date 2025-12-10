// src/components/Meal/ReviewSection.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";


const ReviewSection = ({ mealId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Fetch all reviews for this meal
  const { data: reviews } = useQuery({
    queryKey: ["reviews", mealId],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${mealId}`);
      return response.data;
    },
  });

  // Mutation to submit a new review
  const addReviewMutation = useMutation({
    mutationFn: async (newReview) => {
      if (!user) throw new Error("User must be logged in");
      const token = await user.getIdToken();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews/${mealId}`,
        newReview,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", mealId]);
      setReviewText("");
      setReviewRating(5);
      alert("Review submitted successfully!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText) return alert("Please write a review.");

    const reviewData = {
      userId: user.uid,
      userName: user.displayName,
      userImage: user.photoURL || "",
      text: reviewText,
      rating: reviewRating,
      createdAt: new Date(),
    };

    addReviewMutation.mutate(reviewData);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {/* Existing Reviews */}
      <div className="space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="border p-3 rounded-lg shadow-sm flex gap-3 items-start"
            >
              {/* Reviewer Image */}
              {rev.userImage && (
                <img
                  src={rev.userImage}
                  alt={rev.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{rev.userName}</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm font-medium">
                    ⭐ {rev.rating}
                  </span>
                </div>
                <p className="mt-1 text-gray-700">{rev.text}</p>
                <p className="text-xs text-gray-400">
                  {new Date(rev.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="w-full border p-3 rounded-lg"
        />
        <div className="flex items-center gap-3">
          <label className="font-medium">Rating:</label>
          <select
            value={reviewRating}
            onChange={(e) => setReviewRating(Number(e.target.value))}
            className="border rounded-lg p-1"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* Give Review Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Give Review
          </button>

          {/* Add to Favorite Button */}
          <button
            type="button"
            onClick={() => alert("Added to favorites!")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Add to Favorite
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewSection;
