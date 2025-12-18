


import useAuth from '../../../hooks/useAuth'
import coverImg from '../../../assets/images/banner.jpg'
import useRole from '../../../hooks/useRole'

const Profile = () => {
  const { user } = useAuth()
  const { role, status, isRoleLoading } = useRole()

  if (isRoleLoading) {
    return <p className="text-center mt-20 text-xl">Loading...</p>
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        {/* Cover Image */}
        <img
          alt='cover photo'
          src={coverImg}
          className='w-full mb-6 rounded-t-2xl object-cover h-48'
        />

        <div className='flex flex-col items-center justify-center p-6 -mt-16'>
          {/* Profile Image */}
          <img
            alt='profile'
            src={user?.photoURL}
            className='rounded-full w-32 h-32 border-4 border-white shadow-lg object-cover'
          />

          {/* Role */}
          <p className='mt-3 px-5 py-1 text-sm font-semibold text-white bg-lime-500 rounded-full'>
            Role: {role}
          </p>

          {/* Status */}
          <p
            className={`mt-2 px-5 py-1 text-sm font-semibold rounded-full text-white
              ${status === 'fraud' ? 'bg-red-500' : 'bg-green-500'}
            `}
          >
            Status: {status}
          </p>

          {/* User Info */}
          <p className='mt-4 text-xl font-semibold text-gray-800'>
            User Id: {user?.uid}
          </p>

          <div className='w-full mt-6 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600'>
              {/* Name */}
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-gray-800'>{user?.displayName}</span>
              </p>

              {/* Email */}
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-gray-800'>{user?.email}</span>
              </p>
            </div>

            {/* Buttons */}
          
          </div>

          {/* Fraud Warning */}
          {status === 'fraud' && (
            <div className="mt-6 bg-red-100 text-red-800 p-4 rounded-lg text-center">
              ⚠ Your account has been flagged as fraud. Some actions may be restricted.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
