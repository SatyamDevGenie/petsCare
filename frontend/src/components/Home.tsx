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
  petImage: string;
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
      <h2 className="text-2xl font-bold text-center mb-12">"Find Your Dream Dog or Cat at petsCare"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {petsList.map((pet: Pet) => (
          <PetsCard key={pet._id} {...pet} />
        ))}
      </div>
    </div>
  );
};

export default Home;