// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";
// import toast from "react-hot-toast";

// const ReviewSection = ({ foodId, meal, onReviewSubmit }) => {
//   const { user } = useAuth();
//   const queryClient = useQueryClient();

//   // Fetch all reviews of this meal
//   const { data: reviews = [], isLoading } = useQuery({
//     queryKey: ["reviews", foodId],
//     queryFn: async () => {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${foodId}`);
//       return res.data;
//     },
//   });

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   // Submit Review Mutation

// const reviewMutation = useMutation({
//   mutationFn: async ({ reviewData, token }) => {
//     return await axios.post(
//       `${import.meta.env.VITE_API_URL}/reviews`,
//       reviewData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   },
//   onSuccess: () => {
//     toast.success("Review submitted successfully!");
//     queryClient.invalidateQueries(["reviews", foodId]);
//     setComment("");
//   },
//   onError: (err) => {
//     console.log(err);
//     toast.error("Failed to submit review");
//   },
// });




//   // Favorite Mutation
//   const favoriteMutation = useMutation({
//     mutationFn: async (favData) => {
//       return await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, favData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//     },
//     onSuccess: () => {
//       toast.success("Added to Favorites!");
//     },
//     onError: () => {
//       toast.error("Already in Favorites!");
//     },
//   });

// const handleSubmitReview = async () => {
//   if (!user) return toast.error("Please login to submit review!");

//   const token = await user.getIdToken();

//   const reviewData = {
//     foodId,
//     reviewerName: user.displayName,
//     reviewerImage: user.photoURL,
//     reviewerEmail: user.email,
//     rating,
//     comment,
//     date: new Date().toISOString(),
//   };

//   reviewMutation.mutate({ reviewData, token });
// };


//   const handleAddToFavorite = () => {
//     if (!user) return toast.error("Please login first!");

//     const favData = {
//       userEmail: user.email,
//       mealId: meal._id,
//       mealName: meal.foodName,
//       chefId: meal.chefId,
//       chefName: meal.chefName,
//       price: meal.price,
//       addedTime: new Date().toISOString(),
//     };

//     favoriteMutation.mutate(favData);
//   };

//   if (isLoading) return <p>Loading reviews...</p>;

//   return (
//     <div className="mt-10 p-6 bg-gray-50 rounded-xl">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Reviews</h2>

//         <button
//           onClick={handleAddToFavorite}
//           className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//         >
//           ⭐ Add to Favorite
//         </button>
//       </div>

//       {/* Show All Reviews */}
//       <div className="space-y-4 mb-6">
//         {reviews.length === 0 ? (
//           <p>No reviews yet.</p>
//         ) : (
//           reviews.map((rev) => (
//             <div key={rev._id} className="p-4 bg-white rounded-xl shadow">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={rev.reviewerImage}
//                   alt=""
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <h4 className="font-semibold">{rev.reviewerName}</h4>
//                   <p className="text-yellow-500">⭐ {rev.rating}</p>
//                 </div>
//               </div>
//               <p className="mt-2">{rev.comment}</p>
//               <p className="text-sm text-gray-500">
//                 {new Date(rev.date).toLocaleDateString()}
//               </p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Add Review Form */}
//       <div className="p-4 bg-white rounded-xl shadow-lg">
//         <h3 className="text-xl font-semibold mb-2">Give Review</h3>

//         <select
//           className="border w-full p-2 rounded mb-3"
//           value={rating}
//           onChange={(e) => setRating(Number(e.target.value))}
//         >
//           <option value={5}>5 - Excellent</option>
//           <option value={4}>4 - Good</option>
//           <option value={3}>3 - Average</option>
//           <option value={2}>2 - Poor</option>
//           <option value={1}>1 - Bad</option>
//         </select>

//         <textarea
//           className="border w-full p-2 rounded"
//           placeholder="Write your review..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         ></textarea>

//         <button
//           onClick={handleSubmitReview}
//           className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Submit Review
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewSection;
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const ReviewSection = ({ foodId, meal }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* ================= GET REVIEWS ================= */
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", foodId],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/reviews/${foodId}`
      );
      return res.data;
    },
  });

  /* ================= STATE ================= */
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  /* ================= SUBMIT REVIEW ================= */
  const reviewMutation = useMutation({
    mutationFn: async ({ reviewData, token }) => {
      return await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries(["reviews", foodId]);
      setComment("");
      setRating(5);
    },
    onError: () => {
      toast.error("Failed to submit review");
    },
  });

  /* ================= ADD TO FAVORITE ================= */
  const favoriteMutation = useMutation({
    mutationFn: async ({ favData, token }) => {
      return await axios.post(
        `${import.meta.env.VITE_API_URL}/favorites`,
        favData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      toast.success("Added to Favorites!");
      navigate("/dashboard/favorite-meals"); // ✅ redirect
    },
    onError: () => {
      toast.error("Already in Favorites!");
    },
  });

  /* ================= HANDLERS ================= */
  const handleSubmitReview = async () => {
    if (!user) return toast.error("Please login to submit review!");

    const token = await user.getIdToken();

    const reviewData = {
      foodId,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      reviewerEmail: user.email,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    reviewMutation.mutate({ reviewData, token });
  };

  const handleAddToFavorite = async () => {
    if (!user) return toast.error("Please login first!");

    const token = await user.getIdToken();

    const favData = {
      userEmail: user.email,
      mealId: meal._id,
      foodName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date().toISOString(),
    };

    favoriteMutation.mutate({ favData, token });
  };

  if (isLoading) return <p>Loading reviews...</p>;

  /* ================= UI ================= */
  return (
    <div className="mt-10 p-6 bg-gray-50 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reviews</h2>

        <button
          onClick={handleAddToFavorite}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          ⭐ Add to Favorite
        </button>
      </div>

      {/* REVIEWS LIST */}
      <div className="space-y-4 mb-6">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="p-4 bg-white rounded-xl shadow">
              <div className="flex items-center gap-3">
                <img
                  src={rev.reviewerImage}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{rev.reviewerName}</h4>
                  <p className="text-yellow-500">⭐ {rev.rating}</p>
                </div>
              </div>

              <p className="mt-2">{rev.comment}</p>
              <p className="text-sm text-gray-500">
                {new Date(rev.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ADD REVIEW FORM */}
      <div className="p-4 bg-white rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Give Review</h3>

        <select
          className="border w-full p-2 rounded mb-3"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Good</option>
          <option value={3}>3 - Average</option>
          <option value={2}>2 - Poor</option>
          <option value={1}>1 - Bad</option>
        </select>

        <textarea
          className="border w-full p-2 rounded"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleSubmitReview}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
