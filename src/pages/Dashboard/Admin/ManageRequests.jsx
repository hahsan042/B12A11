import React, { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import useAuth from "../../../hooks/useAuth"

const ManageRequests = () => {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    if (!user) return
    try {
      setLoading(true)
      const token = await user.getIdToken()

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/requests`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setRequests(res.data)
    } catch (err) {
      console.error(err)
      Swal.fire("Error", "Failed to fetch requests", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [user])

  const handleAccept = async (id, requestType) => {
    if (!user) return
    try {
      const token = await user.getIdToken()
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/requests/${id}/accept`,
        { requestType },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      Swal.fire("Success", "Request approved successfully", "success")
      fetchRequests()
    } catch (err) {
      console.error(err)
      Swal.fire("Error", "Failed to approve request", "error")
    }
  }

  const handleReject = async (id) => {
    if (!user) return
    try {
      const token = await user.getIdToken()
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/requests/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      Swal.fire("Success", "Request rejected", "success")
      fetchRequests()
    } catch (err) {
      console.error(err)
      Swal.fire("Error", "Failed to reject request", "error")
    }
  }

  if (loading) return <p>Loading requests...</p>

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage User Requests</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Request Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Request Time</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="border px-4 py-2">{req.userName}</td>
              <td className="border px-4 py-2">{req.userEmail}</td>
              <td className="border px-4 py-2">{req.requestType}</td>
              <td className="border px-4 py-2 capitalize">{req.requestStatus}</td>
              <td className="border px-4 py-2">{new Date(req.requestTime).toLocaleString()}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleAccept(req._id, req.requestType)}
                  className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  disabled={req.requestStatus !== "pending"}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(req._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  disabled={req.requestStatus !== "pending"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageRequests
