// import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
// import CustomerStatistics from '../../../components/Dashboard/Statistics/CustomerStatistics'
// import SellerStatistics from '../../../components/Dashboard/Statistics/SellerStatistics'
// const Statistics = () => {
//   return (
//     <div>
//       <AdminStatistics />
//       <CustomerStatistics/>
//       <SellerStatistics/>

//     </div>
//   )
// }

// export default Statistics


import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics';
import CustomerStatistics from '../../../components/Dashboard/Statistics/CustomerStatistics';
import SellerStatistics from '../../../components/Dashboard/Statistics/SellerStatistics';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useRole from '../../../hooks/useRole'; 


const Statistics = () => {
  const { role, isRoleLoading } = useRole(); 

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {role === 'admin' && <AdminStatistics />}
      {role === 'user' && <CustomerStatistics />}
      {role === 'chef' && <SellerStatistics />}
    </div>
  );
};

export default Statistics;
