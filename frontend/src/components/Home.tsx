import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../services/petsService";
import PetsCard from "../components/PetsCard";
import { RootState } from "../redux/store";

interface Pet {
  _id: string;
  name: string;
  type: string;
  gender: string;
  image: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { petsList } = useSelector((state: RootState) => state.pets);

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

  return (
    <div className="container mx-auto px-4 py-40">
      <h6 className="text-center text-xl sm:text-lg md:text-xl font-extrabold mb-16 sm:mb-8">" Compassionate Care, Healthier Paws 🐾"</h6>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
        {petsList.map((pet: Pet) => (
          <PetsCard key={pet._id} {...pet} />
        ))}
      </div>
    </div>
  );
};

export default Home;