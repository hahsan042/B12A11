import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { uploadImageToImgBB } from '../../Utils'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const { register, handleSubmit, formState: { errors } } = useForm()

  if (loading) return <LoadingSpinner />

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data
    setLoading(true)

    try {
      // 1️⃣ Create user in Firebase Auth
      const result = await createUser(email, password)

      // 2️⃣ Upload photo if provided
      let photoURL = 'https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c' // default
      if (photo && photo[0]) {
        photoURL = await uploadImageToImgBB(photo[0])
        console.log('Uploaded ImgBB URL:', photoURL)
      }

      // 3️⃣ Update Firebase profile
      await updateUserProfile(name, photoURL)

      // ✅ Show success toast
      toast.success('Account created successfully!')

      // 4️⃣ Navigate
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      toast.error(err?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
      toast.success('Signed in with Google!')
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      toast.error(err?.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Create Account</h1>
          <p className='mt-2 text-sm text-gray-500'>Join PlantNet and get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          {/* Name */}
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              id='name'
              type='text'
              placeholder='Enter your name'
              {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' } })}
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500 focus:border-lime-500 bg-gray-50 text-gray-900 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>}
          </div>

          {/* Profile Photo */}
          <div>
            <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>Profile Photo (optional)</label>
            <input
              id='photo'
              type='file'
              accept='image/*'
              {...register('photo')}
              className='mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100 bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 py-2'
            />
            <p className='mt-1 text-xs text-gray-400'>PNG, JPG or JPEG (max 2MB)</p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email address</label>
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' } })}
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500 focus:border-lime-500 bg-gray-50 text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='********'
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-lime-500 focus:border-lime-500 bg-gray-50 text-gray-900 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button type='submit' className='w-full flex justify-center items-center px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 transition'>
            {loading ? <TbFidgetSpinner className='animate-spin' /> : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center justify-center space-x-2 mt-4'>
          <span className='block w-1/5 h-px bg-gray-300'></span>
          <span className='text-sm text-gray-400'>Or continue with</span>
          <span className='block w-1/5 h-px bg-gray-300'></span>
        </div>

        {/* Google Sign-in */}
        <button onClick={handleGoogleSignIn} className='flex justify-center items-center w-full mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition'>
          <FcGoogle className='mr-2' size={24} />
          Continue with Google
        </button>

        {/* Login Link */}
        <p className='text-center text-sm text-gray-500 mt-4'>
          Already have an account?{' '}
          <Link to='/login' className='text-lime-600 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
