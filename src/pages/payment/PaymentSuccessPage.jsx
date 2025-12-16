
// export default PaymentSuccessPage;
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { user } = useAuth();

  useEffect(() => {
    if (!orderId || !user) return;

    const updatePayment = async () => {
      try {
        const token = await user.getIdToken(); // 🔑 Firebase JWT
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/orders/${orderId}/pay`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }, // 🔑 attach token
          }
        );
        console.log('Payment updated successfully');
      } catch (err) {
        console.error('Payment update failed:', err);
      }
    };

    updatePayment();
  }, [orderId, user]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
      <p className="mt-4">Thank you for your purchase!</p>
    </div>
  );
};

export default PaymentSuccessPage;
