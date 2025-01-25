import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSinglePet } from "../services/petsService";
import { RootState, AppDispatch } from "../redux/store";

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

  return (
    <div className="max-w-7xl mx-auto p-12 shadow-2xl rounded-lg mt-16 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Pet Image Section */}
        <div className="flex justify-center items-center w-full rounded-lg overflow-hidden shadow-xl">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Pet Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">{pet.name}</h2>
            <div className="text-lg text-gray-600 mb-6 space-y-4">
              <p className="font-semibold text-gray-800">
                <span className="text-teal-600">Breed:</span> {pet.breed}
              </p>
              <p className="font-semibold text-gray-800">
                <span className="text-teal-600">Age:</span> {pet.age} years
              </p>
              <p className="font-semibold text-gray-800">
                <span className="text-teal-600">Type:</span> {pet.type}
              </p>
              <p className="font-semibold text-gray-800 mb-6">
              <span className="font-semibold  text-teal-600">Description:</span> {pet.notes}
            </p>
            </div>
          
          </div>

          {/* Button Section */}
          <div className="space-x-4">
            <Link to="/">
              <button className="bg-teal-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 text-lg">
                Back to Pets List
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
