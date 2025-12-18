import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../../components/Home/Card";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const HomeMeals = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meals-home"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/add-food`);
      return res.data; // backend থেকে আসা object
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 text-center">Error fetching meals.</div>;

  // Object থেকে array slice করা
  const displayedMeals = data?.meals?.slice(0, 6) || []; // fallback empty array

  return (
    <Container>
      <h2 className="text-3xl font-bold text-center mb-8">Popular Meals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        <Card meals={displayedMeals} />
      </div>
    </Container>
  );
};

export default HomeMeals;
