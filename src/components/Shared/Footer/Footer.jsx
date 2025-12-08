import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-200 mt-10'>
      <div className='max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Contact Details */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
          <p>LocalChefBazaar</p>
          <p>123 Main Street, Dhaka, Bangladesh</p>
          <p>Phone: +880 123 456 789</p>
          <p>Email: support@localchefbazaar.com</p>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Working Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
          <div className='flex space-x-4 mt-2'>
            <a href='#' className='hover:text-lime-500 transition'>
              <FaFacebookF size={20} />
            </a>
            <a href='#' className='hover:text-lime-500 transition'>
              <FaTwitter size={20} />
            </a>
            <a href='#' className='hover:text-lime-500 transition'>
              <FaInstagram size={20} />
            </a>
            <a href='#' className='hover:text-lime-500 transition'>
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Newsletter or Extra Info */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Subscribe</h3>
          <p className='text-sm mb-2'>
            Get the latest updates, offers, and news.
          </p>
          <form className='flex flex-col sm:flex-row gap-2'>
            <input
              type='email'
              placeholder='Your email'
              className='px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500 bg-gray-800 text-gray-200 w-full'
            />
            <button
              type='submit'
              className='px-4 py-2 bg-lime-600 hover:bg-lime-700 rounded-md text-white font-semibold transition'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className='border-t border-gray-700 mt-10 py-4 text-center text-sm text-gray-400'>
        &copy; {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
