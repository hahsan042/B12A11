import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo.png'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 '>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            
            {/* Logo */}
            <Link to='/'>
              <img src={logo} alt='logo' width='100' height='100' />
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex gap-8 text-lg font-semibold'>
              <Link to='/'>Home</Link>
              <Link to='/meals'>Meals</Link>

              {user && <Link to='/dashboard'>Dashboard</Link>}
            </div>

            {/* Dropdown Menu for mobile & avatar actions */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  
                  {/* Avatar */}
                  <div className='hidden md:block'>
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user?.photoURL || avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown Content */}
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[12vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>

                    {/* Mobile only nav links */}
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    <Link
                      to='/meals'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Meals
                    </Link>

                    {user && (
                      <Link
                        to='/dashboard'
                        className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Dashboard
                      </Link>
                    )}

                    {user ? (
                      <>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
