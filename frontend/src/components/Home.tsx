import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../services/petsService";
import PetsCard from "../components/PetsCard";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

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
    const fetchPetsData = async () => {
      try {
        await fetchPets(dispatch);
      } catch (error: any) {
        console.error("Error fetching pets:", error.message);
      }
    };

    fetchPetsData();
  }, [dispatch]);

  const handleCreatePet = () => {
    navigate("/create-pet");
  };

  const handleAddServices = () => {
    navigate("/add-services");
  };

  const isAdmin = userInfo && userInfo.email === "admin@gmail.com";

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative mb-8 sm:mb-16 mt-4">
        <div className="absolute"></div>
        <div className="relative text-center py-12 sm:py-20">
          <h1 className="text-2xl sm:text-5xl font-bold text-gray-800 mb-4">
            Welcome to Pet Paradise 🐾
          </h1>
          <p className="text-sm sm:text-lg text-green-600 max-w-lg mx-auto mt-8 font-medium">
            Explore our collection of adorable pets and give them the love and care they deserve
          </p>
        </div>
      </div>

      {/* Admin Buttons */}
      {isAdmin && (
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <button
            onClick={handleAddServices}
            className="bg-indigo-600 text-white font-medium p-2 md:px-5 sm:p-3 text-sm sm:text-lg flex items-center justify-center rounded-lg shadow-md hover:bg-indigo-700 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Add Services
          </button>
        </div>
      )}

      {/* Pets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
        {petsList.map((pet: Pet) => (
          <PetsCard key={pet._id} {...pet} />
        ))}
      </div>

      {/* Call to Action for Admin */}
      {isAdmin && (
        <div className="text-center mt-10 sm:mt-20">
          <h3 className="text-lg sm:text-2xl font-medium mb-4">
            Don't see the perfect pet ? 🐶🐱
          </h3>
          <button
            onClick={handleCreatePet}
            className="bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-pink-600 transition-all text-sm sm:text-base font-extrabold"
          >
            Create a Pet Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
