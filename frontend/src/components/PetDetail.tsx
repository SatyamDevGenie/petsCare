import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSinglePet } from "../services/petsService";
import { RootState, AppDispatch } from "../redux/store";
import { motion } from "framer-motion";

interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  notes: string;
  image: string;
  type: string;
}

const PetDetail: React.FC<Pet> = () => {
  const { petId } = useParams(); // Get petId from URL
  const dispatch = useDispatch<AppDispatch>(); // Correctly type dispatch

  // Access the state for the single pet data
  const { pet } = useSelector((state: any) => state.pets);
  const isLoading = !pet && petId; // Check if pet is loading and `petId` exists

  useEffect(() => {
    if (petId) {
      dispatch(fetchSinglePet(petId)); // Dispatch the action to fetch the pet by ID
    }
  }, [dispatch, petId]); // Adding dependencies to the useEffect to re-run when `petId` changes

  // Handle loading state
  if (isLoading) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  // Handle no pet found scenario
  if (!pet) {
    return <div className="text-center text-xl text-red-500">Pet not found</div>;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-12 shadow-xl rounded-lg mt-16 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Pet Image Section */}
        <motion.div
          className="flex justify-center items-center w-full rounded-lg overflow-hidden shadow-xl"
          variants={imageVariants}
        >
          <img
            src={pet.image}
            alt={pet.name}
            className="h-50 object-fit rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Pet Details Section */}
        <div className="flex flex-col justify-between space-y-6">
          <motion.div
            className="text-lg text-gray-600 space-y-4"
            variants={containerVariants}
          >
            <h2 className="text-4xl font-bold text-gray-800">{pet.name}</h2>
            <p className="font-semibold text-gray-800">
              <span className="text-teal-600">Breed:</span> {pet.breed}
            </p>
            <p className="font-semibold text-gray-800">
              <span className="text-teal-600">Age:</span> {pet.age} years
            </p>
            <p className="font-semibold text-gray-800">
              <span className="text-teal-600">Type:</span> {pet.type}
            </p>
            <p className="font-semibold text-gray-800">
              <span className="text-teal-600">Description:</span> {pet.notes}
            </p>
          </motion.div>

          {/* Button Section */}
          <motion.div
            className="flex justify-center mt-6"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/">
              <button className="bg-teal-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 text-lg">
                Back to Pets List
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PetDetail;
