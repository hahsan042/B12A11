// import { useQuery } from '@tanstack/react-query';
// import PlantDataRow from '../../../components/Dashboard/TableRows/PlantDataRow'
// import useAuth from '../../../hooks/useAuth';
// import axios from 'axios';
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

// const MyInventory = () => {
//    const { user } = useAuth();
  
//     const { data: meals, isLoading, isError, refetch } = useQuery({
//       queryKey: ['inventory', user?.email],
//       queryFn: async () => {
//         const token = await user.getIdToken();
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-inventory/${user.email}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         return res.data;
//       },
//       enabled: !!user,
//     });
  
//     if (isLoading) return <LoadingSpinner/>;
//     if (isError) return <div className="text-red-500 text-center">Failed to load orders.</div>;
//   return (
//     <>
//       <div className='container mx-auto px-4 sm:px-8'>
//         <div className='py-8'>
//           <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//               <table className='min-w-full leading-normal'>
//                 <thead>
//                   <tr>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Image
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Name
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Rating
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Price
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Ingredients
//                     </th>
//                        <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Chef Name
//                     </th>
//                        <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Chef ID 
//                     </th>

//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Delete
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Update
//                     </th>
//                   </tr>
//                 </thead>
//                  <tbody>
//                 {meals.length > 0 ? (
//                   meals.map((meal) => (
//                     <PlantDataRow
//                       key={meal._id}
//                       meal={meal}
//                       refetchOrders={refetch} // Pass refetch for automatic UI refresh
//                     />
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center py-4">
//                       No meals found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default MyInventory



import { useQuery } from '@tanstack/react-query';
import PlantDataRow from '../../../components/Dashboard/TableRows/PlantDataRow';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyInventory = () => {
  const { user } = useAuth();

  const { data: meals, isLoading, isError, refetch } = useQuery({
    queryKey: ['inventory', user?.email],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-inventory/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 text-center">Failed to load inventory.</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white">
            <table className="min-w-full leading-normal">
              {/* Table Header */}
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 text-gray-800 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 text-gray-800 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 text-gray-800 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 text-gray-800 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 text-gray-800 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Ingredients
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 text-gray-800 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Chef Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 text-gray-800 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Chef ID
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 text-gray-800 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Delete
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 text-gray-800 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    Update
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {meals.length > 0 ? (
                  meals.map((meal) => (
                    <PlantDataRow
                      key={meal._id}
                      meal={meal}
                      refetchOrders={refetch} // Pass refetch for automatic UI refresh
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No meals found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInventory;
