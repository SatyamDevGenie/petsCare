import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchSinglePet, deletePet } from "../services/petsService";
import { RootState, AppDispatch } from "../redux/store";
import EditPetModal from "./EditPetModel";
import toast from "react-hot-toast";

const PetDetail = () => {
  const { petId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { pet } = useSelector((state: any) => state.pets);
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (petId) dispatch(fetchSinglePet(petId));
  }, [dispatch, petId]);

  if (!pet)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-500">
        {petId ? "Loading..." : "Pet not found"}
      </div>
    );

  const handleDelete = async () => {
    try {
      dispatch(deletePet(pet._id));
      navigate("/");
      toast.success("Pet Deleted", {
        style: { fontSize: "14px", padding: "10px", fontWeight: "bold" },
      });
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 m-7 bg-white shadow-md rounded-lg mt-10 pb-5 py-">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-64 h-88 object-contain rounded-lg shadow-md"
        />
        <div className="flex-1 space-y-5">
          <h2 className="text-4xl font-bold text-gray-800">{pet.name}</h2>
          <p className="text-gray-600">
            <span className="font-semibold">Breed:</span> {pet.breed}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Gender:</span> {pet.gender}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Age:</span> {pet.age} years
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Type:</span> {pet.type}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Description:</span> {pet.notes}
          </p>
        </div>
      </div>

      {userInfo?.isAdmin && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 text-black font-medium px-7 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-black font-medium px-7 py-2 rounded-md hover:bg-red-800 transition"
          >
            Delete
          </button>
        </div>
      )}

      <div className="mt-10">
        <Link to="/">
          <button className="bg-black text-white font-medium px-10 py-2 rounded-md hover:bg-gray-800 transition">
            Go Back
          </button>
        </Link>
      </div>

      <EditPetModal pet={pet} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default PetDetail;












