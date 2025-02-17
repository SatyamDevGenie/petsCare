import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { updatePet } from "../services/petsService";
import toast from "react-hot-toast";

interface PetProps {
  pet: {
    _id: string;
    name: string;
    type: string;
    breed: string;
    age: string;
    gender: string;
    notes: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditPetModal: React.FC<PetProps> = ({ pet, isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    notes: "",
  });

  // Update form data when pet changes
  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name || "",
        type: pet.type || "",
        breed: pet.breed || "",
        age: pet.age || "",
        gender: pet.gender || "",
        notes: pet.notes || "",
      });
    }
  }, [pet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pet || !pet._id) {
      console.error("Pet data is missing!");
      return;
    }

    try {
      await dispatch(
        updatePet({
          _id: pet._id, // Ensure _id exists
          name: formData.name,
          type: formData.type,
          breed: formData.breed, // Fix breed assignment
          age: formData.age,
          gender: formData.gender,
          notes: formData.notes,
        })
      );
      // Show success toast
      toast.success("Pet Updated", {
        style: {
          fontSize: "14px", // Smaller text size
          padding: "8px", // Reduce padding
          minWidth: "200px", // Reduce width
          fontFamily: "Arial Black",
          fontWeight: "bolder",
        },
      });
      navigate("/");
      onClose();
    } catch (error: any) {
      console.error("Error updating pet:", error.message);
    }
  };

  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl sm:w-96">
        <div className="px-4 py-3 pb-0 border-b border-gray-200 flex justify-between">
          <h3 className="text-xl font-semibold text-gray-900 my-4 mt-2">
            Update Pet
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        <div className="pb-0">
          <form onSubmit={handleSubmit} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Breed
                </label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Age
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>

              <div className="col-span-1 md:col-span-2 mb-5">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-100 flex justify-between gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPetModal;