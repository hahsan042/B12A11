import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '../Shared/Container'

const HomeSections = () => {
  const [meals, setMeals] = useState([])
  const [reviews, setReviews] = useState([])

  // Fetch Daily Meals
  useEffect(() => {
    fetch('http://localhost:5000/meals?limit=6')
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error(err))
  }, [])

  // Fetch Customer Reviews
  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className='space-y-32'>
      {/* Daily Meals Section */}
      <section className='bg-gray-50 py-20'>
        <Container>
          <h2 className='text-4xl font-bold text-gray-900 text-center mb-12'>
            Today's Specials
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {meals.map(meal => (
              <motion.div
                key={meal._id}
                whileHover={{ scale: 1.05 }}
                className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition'
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {meal.name}
                  </h3>
                  <p className='text-gray-600 mb-4'>{meal.description}</p>
                  <div className='flex justify-between items-center'>
                    <span className='text-lime-600 font-bold'>${meal.price}</span>
                    <button className='px-3 py-1 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition'>
                      Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Customer Reviews Section */}
      <section className='bg-white py-20'>
        <Container>
          <h2 className='text-4xl font-bold text-gray-900 text-center mb-12'>
            Customer Reviews
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {reviews.map(review => (
              <motion.div
                key={review._id}
                whileHover={{ scale: 1.03 }}
                className='bg-gray-50 p-6 rounded-xl shadow-md'
              >
                <div className='flex items-center mb-4'>
                  <img
                    src={review.userImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt={review.userName}
                    className='w-12 h-12 rounded-full mr-4'
                  />
                  <div>
                    <h3 className='font-semibold text-gray-900'>{review.userName}</h3>
                    <p className='text-gray-500 text-sm'>{review.date}</p>
                  </div>
                </div>
                <p className='text-gray-600'>{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HomeSections
