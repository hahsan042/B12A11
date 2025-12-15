import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdatePlantModal from '../../Modal/UpdatePlantModal'
import useAuth from '../../../hooks/useAuth'

const PlantDataRow = ({meal ,refetchOrders}) => {
  let [isOpen, setIsOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { user } = useAuth();
  console.log(meal);
  

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={meal.foodImage}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{meal.foodName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{meal.rating}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{meal.price}</p>
      </td>
       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{meal.ingredients}</p>
      </td>
       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{meal.chefName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{meal.chefId}</p>
      </td>

      {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={openModal}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </span>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td> */}
       <td>
        <span onClick={openModal}>Delete</span>
     <DeleteModal
  isOpen={isOpen}
  closeModal={closeModal}
  meal={meal}         // <-- meal object পাঠাতে হবে
  user={user}
  refetchOrders={refetchOrders}
/>

      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsEditModalOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </span>
        <UpdatePlantModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  )
}

export default PlantDataRow
