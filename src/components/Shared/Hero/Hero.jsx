import { motion } from 'framer-motion'
import heroImage from '../../../assets/images/banner.jpg' // replace with your image
import Container from '../Container'
import { useNavigate } from 'react-router-dom' // useNavigate import

const Hero = () => {
  const navigate = useNavigate(); // hook initialize

  return (
    <div>
      {/* Hero Section */}
      <section className='relative bg-gray-50'>
        <Container>
          <div className='flex flex-col-reverse md:flex-row items-center justify-between py-20 gap-10'>
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className='md:w-1/2 space-y-6'
            >
              <h1 className='text-5xl font-bold text-gray-900'>
                Delicious Meals Delivered to Your Doorstep
              </h1>
              <p className='text-gray-600 text-lg'>
                Experience fresh, home-cooked meals from local chefs. Order your favorite meals anytime.
              </p>
              
              {/* Order Now Button */}
              <button
                onClick={() => navigate("/meals")} // navigate to meals page
                className='px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-lg font-semibold shadow-md transition'
              >
                Order Now
              </button>
             
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className='md:w-1/2'
            >
              <img
                src={heroImage}
                alt='Delicious Meals'
                className='rounded-xl shadow-lg'
              />
            </motion.div>

          </div>
        </Container>
      </section>
    </div>
  )
}

export default Hero
