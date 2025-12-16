import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveOrUpdateUser } from '../../Utils'   // ✅ added

const Login = () => {
  const { signIn, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  const onSubmit = async data => {
    const { email, password } = data
    try {
      setLoading(true)

      // 1️⃣ Firebase login
      const result = await signIn(email, password)
      const loggedUser = result.user

      // 2️⃣ Save / Update user in DB
      await saveOrUpdateUser({
        name: loggedUser.displayName || 'No Name',
        email: loggedUser.email,
        image:
          loggedUser.photoURL ||
          'https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c',
      })

      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      toast.error(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-lime-100 via-white to-lime-50 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl border border-gray-200 rounded-2xl px-8 py-10 space-y-6">
        
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500">Access your account and continue seamlessly</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Provide a valid email address',
                },
              })}
              className={`mt-1 block w-full px-4 py-2 rounded-lg border bg-gray-50 
              focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition
              ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be 6+ characters' },
              })}
              className={`mt-1 block w-full px-4 py-2 rounded-lg border bg-gray-50 
              focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition
              ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 rounded-lg 
            bg-lime-600 text-white font-semibold hover:bg-lime-700 
            transition shadow-lg hover:shadow-xl active:scale-[.98]"
          >
            {loading ? <TbFidgetSpinner className="animate-spin" /> : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 pt-3">
          Don't have an account?{' '}
          <Link to="/signup" className="text-lime-600 font-semibold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
