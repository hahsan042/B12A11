import AddPlantForm from '../../../components/Form/AddPlantForm'
import useRole from '../../../hooks/useRole'

const AddPlant = () => {
  const { role, status, isLoading } = useRole()

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading...
      </div>
    )
  }

  // Block fraud chefs
  if (role === 'chef' && status === 'fraud') {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
        You are not allowed to create meals. Please contact support.
      </div>
    )
  }

  return (
    <div>
      <AddPlantForm />
    </div>
  )
}

export default AddPlant
