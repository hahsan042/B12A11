import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetchUsers }) => {
  const axiosSecure = useAxiosSecure();
  const [updatedRole, setUpdatedRole] = useState(user.role);

  const handleUpdateRole = async () => {
    try {
      await axiosSecure.patch(`/users/${user._id}/role`, { role: updatedRole });
      Swal.fire("Success!", "User role updated!", "success");
      refetchUsers();
      closeModal();
    } catch (err) {
      Swal.fire("Error!", err.response?.data?.message || "Failed", "error");
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-lg font-medium text-gray-900">
            Update Role for {user.name}
          </DialogTitle>

          <select
            value={updatedRole}
            onChange={(e) => setUpdatedRole(e.target.value)}
            className="w-full my-4 border rounded px-2 py-2"
          >
            <option value="user">User</option>
            <option value="chef">Chef</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex justify-end space-x-2">
            <button
              onClick={handleUpdateRole}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Update
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateUserRoleModal;
