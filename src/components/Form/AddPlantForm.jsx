import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { uploadImageToImgBB } from "../../Utils";
import axios from "axios";
import Swal from "sweetalert2";

const CreateMealForm = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm();
  const selectedImage = watch("foodImage");

  const queryClient = useQueryClient();

  // React Query mutation
  const addMealMutation = useMutation({
    mutationFn: async (mealData) => {
      const token = await user.getIdToken();
      const response = await axios.post(
        "http://localhost:3000/add-food",
        mealData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]); // refresh meals if you use query elsewhere
      Swal.fire({
        icon: "success",
        title: "Meal Added",
        text: "Your meal has been successfully added!",
      });
      reset();
    },
    onError: (error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add meal. Check console for details.",
      });
    },
  });

  const onSubmit = async (data) => {
    const {

      chefExperience,
      chefName,
      estimatedDeliveryTime,
      foodName,
      ingredients,
      price,
      foodImage,
    } = data;

    if (!foodImage || foodImage.length === 0) {
      return alert("Please upload an image");
    }

    // 1️⃣ Upload image
    const imageUrl = await uploadImageToImgBB(foodImage[0]);

    // 2️⃣ Convert ingredients → array
    const ingredientsArray = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    // 3️⃣ Create meal object
    const mealData = {
      foodName,
      chefName,
      foodImage: imageUrl,
      price: Number(price),
      rating: 0,
      ingredients: ingredientsArray,
      estimatedDeliveryTime,
      chefExperience,
      chefId: user?.uid || "pending_admin_approval",
      userEmail: user?.email,
      createdAt: new Date(),
      chef: {
        image: user?.photoURL,
        name: user?.displayName,
        email: user?.email,
      },
    };

    // 4️⃣ Trigger mutation
    addMealMutation.mutate(mealData);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 via-white to-lime-100 py-10 px-4">
      <div className="w-full max-w-5xl rounded-3xl shadow-xl bg-white/70 backdrop-blur-xl border border-green-100 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create New Meal
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT SIDE */}
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Food Name</label>
                <input
                  {...register("foodName")}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-green-300 focus:outline-green-500 shadow-sm"
                  placeholder="Enter food name"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Chef Name</label>
                <input
                  {...register("chefName")}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-green-300 focus:outline-green-500 shadow-sm"
                  placeholder="Chef full name"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Ingredients</label>
                <textarea
                  {...register("ingredients")}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-green-300 bg-white shadow-sm focus:outline-green-500"
                  placeholder="Add ingredients (comma separated)"
                  required
                ></textarea>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="space-y-1 text-sm w-full">
                  <label className="font-semibold text-gray-700">Price</label>
                  <input
                    {...register("price")}
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-green-300 focus:outline-green-500 shadow-sm"
                    placeholder="Price in USD"
                    required
                  />
                </div>

                <div className="space-y-1 text-sm w-full">
                  <label className="font-semibold text-gray-700">
                    Estimated Delivery Time
                  </label>
                  <input
                    {...register("estimatedDeliveryTime")}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-green-300 focus:outline-green-500 shadow-sm"
                    placeholder="E.g. 30 minutes"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">Chef Experience</label>
                <input
                  {...register("chefExperience")}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-green-300 focus:outline-green-500 shadow-sm"
                  placeholder="e.g. 5 years professional cooking"
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
                      Upload Food Image
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

              <div className="space-y-1 text-sm">
                <label className="font-semibold text-gray-700">User Email</label>
                <input
                  {...register("userEmail")}
                  type="email"
                  readOnly
                  defaultValue={user?.email}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-green-200 shadow-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={addMealMutation.isLoading}
                className="w-full py-3 mt-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-lime-500 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {addMealMutation.isLoading ? "Saving..." : "Save Meal"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMealForm;
