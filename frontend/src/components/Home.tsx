import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../services/petsService";
import PetsCard from "../components/PetsCard";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react"; // Import Lucide icon for the plus symbol

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


   // Handle redirection to the Create Pet page
   const handleCreatePet = () => {
    navigate("/create-pet");
  };


  return (
    <div className="container mx-auto px-4 py-40">
      <h6 className="text-center text-xl sm:text-lg md:text-xl font-extrabold mb-16 sm:mb-8">" Compassionate Care, Healthier Paws 🐾"</h6>


    {/* Show the plus icon only when the user is logged in */}
    {userInfo && (
        <div className="flex justify-end mb-6">
          <button
            onClick={handleCreatePet}
            className="bg-teal-600 text-white p-3 rounded-full shadow-md hover:bg-teal-700 transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
        {petsList.map((pet: Pet) => (
          <PetsCard key={pet._id} {...pet} />
        ))}
      </div>
    </div>
  );
};

export default Home;








