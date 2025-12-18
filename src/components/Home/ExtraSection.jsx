import React from 'react';
import Container from '../Shared/Container';
import { motion } from 'framer-motion'

const ExtraSection = () => {
    return (
       
      <section className='bg-white py-20'>
        <Container>
          <h2 className='text-4xl font-bold text-center text-gray-900 mb-10'>
            Why Choose LocalChefBazaar?
          </h2>
          <div className='grid md:grid-cols-3 gap-10'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='bg-gray-50 p-6 rounded-xl shadow-md text-center'
            >
              <h3 className='text-xl font-semibold mb-2'>Fresh Ingredients</h3>
              <p className='text-gray-600'>
                All meals are made with fresh and locally sourced ingredients.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='bg-gray-50 p-6 rounded-xl shadow-md text-center'
            >
              <h3 className='text-xl font-semibold mb-2'>Trusted Chefs</h3>
              <p className='text-gray-600'>
                Handpicked local chefs ensure every meal is delicious and safe.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='bg-gray-50 p-6 rounded-xl shadow-md text-center'
            >
              <h3 className='text-xl font-semibold mb-2'>Fast Delivery</h3>
              <p className='text-gray-600'>
                Quick and reliable delivery right to your doorstep.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    );
};

export default ExtraSection;