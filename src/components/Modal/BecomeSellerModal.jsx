// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'
// import axios from "axios";
// import Swal from "sweetalert2";
// import useAuth from '../../hooks/useAuth';
// import useRole from '../../hooks/useRole';

// const BecomeSellerModal = ({ closeModal, isOpen, onRequestSubmitted }) => {
//   const { user } = useAuth();
//   const { role, status, isRoleLoading } = useRole();
//   const [loading, setLoading] = useState(false);

//   const handleRequest = async () => {
//     if (!user) {
//       Swal.fire("Error", "You must be logged in to make a request", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = await user.getIdToken();

//       // ✅ Check if a pending request already exists
//       const existingRequests = await axios.get(
//         `${import.meta.env.VITE_API_URL}/requests`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const pendingRequest = existingRequests.data.find(
//         req => req.userEmail === user.email && req.requestStatus === 'pending'
//       );

//       if (pendingRequest) {
//         Swal.fire("Info", "You already have a pending request", "info");
//         return;
//       }

//       // ✅ Submit new request
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/requests`,
//         {
//           requestType: "chef",
//           userEmail: user.email,
//           userName: user.displayName,
//           requestStatus: "pending",
//           requestTime: new Date()
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       Swal.fire("Success", "Your request has been submitted", "success");

//       // Trigger parent callback to refresh requests
//       if (onRequestSubmitted) onRequestSubmitted();

//       closeModal();
//     } catch (err) {
//       console.error(err);
//       if (err.response?.status === 400) {
//         Swal.fire("Error", err.response.data.message, "error");
//       } else if (err.response?.status === 401) {
//         Swal.fire("Unauthorized", "Session expired. Please login again.", "error");
//       } else {
//         Swal.fire("Error", "Failed to submit request", "error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isDisabled = role === 'chef' || status === 'fraud' || isRoleLoading || loading;

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={closeModal}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-60"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-60"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-2xl font-semibold text-center text-gray-900"
//                 >
//                   Become A Chef!
//                 </Dialog.Title>
//                 <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
//                   Please read all the terms & conditions before becoming a Chef.
//                 </p>

//                 <div className="mt-6 flex justify-center gap-4">
//                   <button
//                     type="button"
//                     className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
//                     onClick={handleRequest}
//                     disabled={isDisabled}
//                   >
//                     {loading ? "Submitting..." : "Continue"}
//                   </button>

//                   <button
//                     type="button"
//                     className="px-5 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 transition"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default BecomeSellerModal;


import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const BecomeSellerModal = ({ closeModal, isOpen, onRequestSubmitted }) => {
  const { user } = useAuth();
  const { role, status, isRoleLoading } = useRole();
  const [loading, setLoading] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  useEffect(() => {
    const checkPendingRequest = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/requests/check/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlreadyRequested(res.data.hasPending);
      } catch (err) {
        console.error(err);
      }
    };

    checkPendingRequest();
  }, [user]);

  const handleRequest = async () => {
    if (!user) {
      Swal.fire("Error", "You must be logged in to make a request", "error");
      return;
    }

    if (alreadyRequested) {
      Swal.fire("Info", "You already have a pending request", "info");
      return;
    }

    setLoading(true);
    try {
      const token = await user.getIdToken();

      await axios.post(
        `${import.meta.env.VITE_API_URL}/requests`,
        {
          requestType: "chef",
          userEmail: user.email,
          userName: user.displayName
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", "Your request has been submitted", "success");
      setAlreadyRequested(true);

      if (onRequestSubmitted) onRequestSubmitted();
      closeModal();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        Swal.fire("Error", err.response.data.message, "error");
      } else {
        Swal.fire("Error", "Failed to submit request", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = role === 'chef' || status === 'fraud' || isRoleLoading || loading || alreadyRequested;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-60"
          leave="ease-in duration-200"
          leaveFrom="opacity-60"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold text-center text-gray-900"
                >
                  Become A Chef!
                </Dialog.Title>
                <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
                  Please read all the terms & conditions before becoming a Chef.
                </p>

                <div className="mt-6 flex justify-center gap-4">
                  <button
                    type="button"
                    className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
                    onClick={handleRequest}
                    disabled={isDisabled}
                  >
                    {loading ? "Submitting..." : "Continue"}
                  </button>

                  <button
                    type="button"
                    className="px-5 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 transition"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BecomeSellerModal;
