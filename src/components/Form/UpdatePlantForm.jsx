import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { uploadImageToImgBB } from "../../Utils";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateMealForm = ({ meal, closeModal }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  console.log(meal);
  

  // যদি meal না থাকে
  if (!meal) return <p className="text-center p-5">Loading...</p>;

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      foodName: meal.foodName || "",
      chefName: meal.chefName || "",
      ingredients: meal.ingredients ? meal.ingredients.join(", ") : "",
      price: meal.price || 0,
      estimatedDeliveryTime: meal.estimatedDeliveryTime || "",
      chefExperience: meal.chefExperience || "",
      foodImage: meal.foodImage || "",
    },
  });

  const selectedImage = watch("foodImage");

  // Update mutation
  const updateMealMutation = useMutation({
    mutationFn: async (updatedData) => {
      const token = await user.getIdToken();
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/add-food/${meal._id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
      Swal.fire("Updated!", "Your meal has been updated.", "success");
      reset();
      closeModal?.();
    },
    onError: (error) => {
      console.error(error);
      Swal.fire("Error!", "Failed to update meal.", "error");
    },
  });

  const onSubmit = async (data) => {
    let imageUrl = meal.foodImage;

    // যদি নতুন image আপলোড করা হয়
    if (data.foodImage && data.foodImage.length > 0 && data.foodImage[0] instanceof File) {
      imageUrl = await uploadImageToImgBB(data.foodImage[0]);
    }

    const ingredientsArray = data.ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const updatedMeal = {
      foodName: data.foodName,
      chefName: data.chefName,
      ingredients: ingredientsArray,
      price: Number(data.price),
      estimatedDeliveryTime: data.estimatedDeliveryTime,
      chefExperience: data.chefExperience,
      foodImage: imageUrl,
    };

    updateMealMutation.mutate(updatedMeal);
  };

  return (
    <div className="w-full flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-green-100 rounded-3xl p-10 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Meal</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT SIDE */}
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Food Name</label>
                <input
                  {...register("foodName")}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-green-300 shadow-sm focus:outline-green-500"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Chef Name</label>
                <input
                  {...register("chefName")}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-green-300 shadow-sm focus:outline-green-500"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Ingredients</label>
                <textarea
                  {...register("ingredients")}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-green-300 shadow-sm focus:outline-green-500"
                  required
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Price</label>
                <input
                  {...register("price")}
                  type="number"
                  className="w-full px-4 py-3 rounded-xl border border-green-300 shadow-sm focus:outline-green-500"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Estimated Delivery Time</label>
                <input
                  {...register("estimatedDeliveryTime")}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-green-300 shadow-sm focus:outline-green-500"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Chef Experience</label>
                <input
                  {...register("chefExperience")}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-green-300 shadow-sm focus:outline-green-500"
                  required
                />
              </div>

              <div className="p-4 rounded-xl bg-white/60 border border-green-200 shadow-inner">
                <div className="border-2 border-dashed border-green-300 rounded-xl p-6 flex flex-col items-center text-center">
                  <label className="cursor-pointer">
                    <input
                      {...register("foodImage")}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md font-medium transition">
                      Upload New Image
                    </div>
                  </label>

                  {selectedImage && selectedImage.length > 0 && (
                    <p className="mt-2 text-sm text-gray-700">
                      Selected: <span className="text-green-600">{selectedImage[0].name}</span>
                    </p>
                  )}

                  <p className="text-gray-500 text-xs mt-1">JPG, PNG, WebP — Max 2MB</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={updateMealMutation.isLoading}
                className="w-full py-3 mt-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-lime-500 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {updateMealMutation.isLoading ? "Updating..." : "Update Meal"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMealForm;
