import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPets } from '../services/petsService'
import PetsCard from '../components/PetsCard'
import { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion' // Import Framer Motion

interface Pet {
  _id: string
  name: string
  type: string
  gender: string
  image: string
}

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { petsList } = useSelector((state: RootState) => state.pets)
  const { userInfo } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        await fetchPets(dispatch)
      } catch (error: any) {
        console.error('Error fetching pets:', error.message)
      }
    }

    fetchPetsData()
  }, [dispatch])

  const handleCreatePet = () => {
    navigate('/create-pet')
  }

  const isAdmin = userInfo && userInfo.email === 'admin@gmail.com'

  return (
    <div className='container mx-auto px-4 py-12 mt-9'>
      {/* Hero Section */}
      <motion.div
        className='relative mb-8 sm:mb-16 mt-10'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <div className='relative text-center py-12 sm:py-20'>
          <h1 className='text-2xl sm:text-5xl font-bold text-gray-800 mb-4'>
            Step into pet Paradise 🐕🐈
          </h1>
          <p className='text-sm sm:text-lg text-green-600 max-w-lg mx-auto mt-12 font-medium'>
            Explore our collection of adorable pets and give them the love and
            care they deserve
          </p>
        </div>
      </motion.div>

      {/* Featured Pets Section */}
      <motion.div
        className='text-center mb-8'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='text-2xl font-medium text-gray-800'>
          Our Featured Pets
        </h2>
      </motion.div>

      {/* Pets Grid */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 sm:gap-8'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              staggerChildren: 0.2 // Stagger the children
            }
          }
        }}
      >
        {petsList.map((pet: Pet) => (
          <motion.div
            key={pet._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 2 }}
          >
            <PetsCard key={pet._id} {...pet} />
          </motion.div>
        ))}
      </motion.div>

      {/* Adoption Information Section */}
      <div className='text-center p-6 sm:p-10 mt-12 sm:mt-16 bg-gray-100 rounded-lg shadow-md'>
        <h2 className='text-lg sm:text-2xl font-bold text-gray-800'>
          Why Adopt With Us?
        </h2>
        <p className='text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-lg'>
          Our adoption process ensures pets find a caring and responsible home.
          We provide medical checkups and support every step of the way.
        </p>
      </div>

      <div className='flex flex-col items-center p-6 sm:p-8 rounded-lg mt-12 w-full text-center'>
        <h2 className='mb-6 text-xl sm:text-2xl font-bold mt-7'>
          Training a Dog by one of our Trainer
        </h2>
        <div className='w-full max-w-3xl'>
          <iframe
            className='w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg shadow-md'
            src='https://www.youtube.com/embed/DkCHTlaFtio'
            title='Pet Care Video'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Admin Buttons */}
      {isAdmin && (
        <motion.div
          className='text-center sm:mt-20 mb-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <h3 className='text-lg sm:text-2xl font-medium mb-4 mt-12'>
            Don't see the perfect pet? 🐶🐱
          </h3>
          <motion.button
            onClick={handleCreatePet}
            className='bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-pink-600 transition-all text-sm sm:text-base font-extrabold'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Create a Pet Now
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default Home
