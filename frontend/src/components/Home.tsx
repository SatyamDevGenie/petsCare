import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../services/petsService";
import PetsCard from "../components/PetsCard";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Pet {
  _id: string;
  name: string;
  type: string;
  gender: string;
  image: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { petsList } = useSelector((state: RootState) => state.pets);
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchPets(dispatch).catch((error) =>
      console.error("Error fetching pets:", error.message)
    );
  }, [dispatch]);

  const handleCreatePet = () => navigate("/create-pet");
  const isAdmin = userInfo?.email === "admin@gmail.com";

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero Section */}
      <motion.div
        className="text-center py-16 sm:py-24 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl sm:text-5xl font-medium text-gray-900 leading-tight">
          Step into Pet Paradise 🐕🐈
        </h1>
        <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-gray-600 max-w-lg mx-auto">
          Explore our collection of adorable pets and give them the love and
          care they deserve.
        </p>
      </motion.div>

      {/* Featured Pets Section */}
      <motion.div
        className="text-center mt-10 sm:mt-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl sm:text-3xl font-medium text-gray-800">
          Our Clients Pets
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6 mt-8 sm:mt-16 px-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {petsList.map((pet: Pet) => (
          <motion.div
            key={pet._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            <PetsCard {...pet} />
          </motion.div>
        ))}
      </motion.div>

      {/* Why Choose petsCare Section */}
      <div className="text-center bg-gray-50 p-4 sm:p-10 mt-12 sm:mt-24 rounded-lg shadow-lg mx-2 sm:mx-4">
        <h2 className="text-lg sm:text-3xl font-medium text-gray-800">
          Why Choose petsCare ?
        </h2>
        <p className="mt-3 sm:mt-6 text-gray-600 max-w-lg mx-auto font-medium text-sm sm:text-base text-justify">
          Our adoption process ensures pets find a loving home. We provide
          medical checkups and full support our clients as well. As well as we
          provide discount offers for particular pets services as per seasonal /
          trending change
        </p>
      </div>

      {/* Training Video Section */}
      <div className="text-center mt-12 sm:mt-24 px-2">
        <h2 className="text-lg sm:text-3xl text-gray-800 font-medium">
          Training a Dog by Our Trainer
        </h2>
        <div className="w-full max-w-lg sm:max-w-4xl mx-auto mt-5 sm:mt-8">
          <iframe
            className="w-full h-48 sm:h-80 rounded-lg shadow-md"
            src="https://www.youtube.com/embed/DkCHTlaFtio"
            title="Pet Training Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Admin Create Pet Section */}
      {isAdmin && (
        <motion.div
          className="text-center mt-12 sm:mt-24 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <h3 className="text-md sm:text-2xl font-medium mb-3 sm:mb-6">
            Don't see the perfect pet? 🐶🐱
          </h3>
          <motion.button
            onClick={handleCreatePet}
            className="bg-black text-white text-sm sm:text-base px-4 sm:px-8 py-2 sm:py-4 rounded-lg shadow-lg font-medium max-w-xs sm:max-w-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Pet
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Home;

