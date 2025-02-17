import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchSinglePet, updatePet, deletePet } from "../services/petsService";
import { RootState, AppDispatch } from "../redux/store";
import EditPetModal from "./EditPetModel";
import toast from "react-hot-toast";

interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  notes: string;
  gender: string;
  image: string;
  type: string;
}

const PetDetail: React.FC<Pet> = () => {
  const { petId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pet } = useSelector((state: any) => state.pets);
  const isLoading = !pet && petId;
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (petId) {
      dispatch(fetchSinglePet(petId));
    }
  }, [dispatch, petId, updatePet]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-red-500">
        Pet not found
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      dispatch(deletePet(pet._id));
      navigate("/");
      // Show success toast
      toast.success("Pet Deleted", {
        style: {
          fontSize: "14px", // Smaller text size
          padding: "8px", // Reduce padding
          minWidth: "200px", // Reduce width
          fontFamily: "Arial Black",
          fontWeight: "bolder",
        },
      });
    } catch (error: any) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-xl rounded-lg mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {pet.name}
            </h2>
            <div className="text-lg text-gray-600 space-y-3">
              <p>
                <span className="font-semibold text-teal-600">Breed:</span>{" "}
                <span className="font-normal">{pet.breed}</span>
              </p>
              <p>
                <span className="font-semibold text-teal-600">Gender:</span>{" "}
                <span className="font-normal">{pet.gender}</span>
              </p>
              <p>
                <span className="font-semibold text-teal-600">Age:</span>{" "}
               <span className="font-normal">{pet.age} years</span>
              </p>
              <p>
                <span className="font-semibold text-teal-600">Type:</span>{" "}
                <span className="font-normal">{pet.type}</span>
              </p>
              <p>
                <span className="font-semibold text-teal-600">
                  Description:
                </span>{" "}
                <span className="font-normal text-black">{pet.notes}</span>
              </p>
            </div>
          </div>
          {userInfo && userInfo.isAdmin && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-indigo-600 text-sm hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded shadow-md transition-transform transform hover:scale-105"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-sm hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-md transition-transform transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <EditPetModal
        pet={pet}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="mt-8">
        <Link to="/">
          <button className="bg-teal-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105 text-lg">
            Back to Pets List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PetDetail;
