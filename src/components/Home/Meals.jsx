// import Card from './Card'
// import Container from '../Shared/Container'

// const Meals = () => {
//   return (
//     <Container>
//       <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
//         <Card />

//       </div>
//     </Container>
//   )
// }

// export default Meals


import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "./Card";
import Container from "../Shared/Container";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Meals = () => {
  const [page, setPage] = useState(1);
  const limit = 10; // 1 page 10 meals

  const { data, isLoading, isError } = useQuery({
    queryKey: ["meals", page],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/add-food?page=${page}&limit=${limit}`
      );
      return res.data; // expected { meals: [...], totalCount: 100 }
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 text-center">Error fetching meals.</div>;

  const { meals, totalCount } = data || { meals: [], totalCount: 0 };
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <Container>
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <Card meals={meals} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                page === i + 1 ? "bg-green-500 text-white" : "bg-white text-gray-700"
              } hover:bg-green-400 hover:text-white transition`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </Container>
  );
};

export default Meals;
