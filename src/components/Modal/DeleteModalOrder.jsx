// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const DeleteModalOrder = ({ closeModal, isOpen, orderId, user, refetchOrders }) => {
// const handleDelete = async () => {
//   try {
//     if (!user) throw new Error('User not found');

//     const token = await user.getIdToken();

//     await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     Swal.fire('Deleted!', 'Your order has been cancelled.', 'success');
//     closeModal();

//     // Refresh orders dynamically
//     if (refetchOrders) refetchOrders();
//   } catch (err) {
//     console.error(err);
//     Swal.fire('Error!', 'Failed to cancel order.', 'error');
//   }
// };


//   return (
//     <Dialog
//       open={isOpen}
//       as="div"
//       className="relative z-10 focus:outline-none"
//       onClose={closeModal}
//     >
//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4">
//           <DialogPanel className="w-full max-w-md bg-white p-6 backdrop-blur-2xl shadow-xl rounded-2xl">
//             <DialogTitle className="text-lg font-medium leading-6 text-gray-900">
//               Are you sure?
//             </DialogTitle>
//             <div className="mt-2">
//               <p className="text-sm text-gray-500">
//                 You cannot undo once it&apos;s done!
//               </p>
//             </div>
//             <hr className="mt-4" />
//             <div className="flex mt-4 justify-around">
//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-green-100 text-green-900 rounded hover:bg-green-200"
//               >
//                 Yes
//               </button>
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-red-100 text-red-900 rounded hover:bg-red-200"
//               >
//                 No
//               </button>
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default DeleteModalOrder;


import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DeleteModalOrder = ({ closeModal, isOpen, orderId, user, refetchOrders }) => {
  const handleDelete = async () => {
    try {
      if (!user) throw new Error('User not found');

      const token = await user.getIdToken();

      await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire('Deleted!', 'Your order has been cancelled.', 'success');
      closeModal();

      // Refresh orders dynamically
      if (refetchOrders) refetchOrders();
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to cancel order.', 'error');
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl border border-gray-300">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Are you sure you want to delete this order?
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                This action is permanent and cannot be undone. Please confirm your decision.
              </p>
            </div>
            <hr className="my-4 border-t border-gray-200" />
            <div className="flex mt-4 justify-around gap-4">
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 focus:outline-none"
              >
                Yes, Delete
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200 focus:outline-none"
              >
                No, Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModalOrder;
