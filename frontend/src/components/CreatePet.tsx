import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPet } from "../services/petsService";
import axios from "axios";
import { AppDispatch } from "../redux/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animations

const CreatePet: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<{
    name: string;
    type: string;
    breed: string;
    age: string;
    gender: string;
    notes: string;
    image: File | null;
  }>({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    notes: "",
    image: null,
  });



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
     
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append("image", formData.image);

        const uploadResponse = await axios.post("/api/uploads/", formDataImage, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadResponse.data.filePath;
      }

      const petData = { ...formData, image: imageUrl };

      // Dispatch the createPet action
      dispatch(createPet(petData));

      // Show success toast
      toast.success("Pet Created", {
        style: {
          fontSize: "14px",
          padding: "8px",
          minWidth: "200px",
          fontFamily: "Arial Black",
          fontWeight: "bolder",
        },
      });

      navigate("/");

      // Reset form
      setFormData({
        name: "",
        type: "",
        breed: "",
        age: "",
        gender: "",
        notes: "",
        image: null,
      });
      
    } catch (error) {
      console.error("Error creating pet:", error);
      alert("Failed to create pet. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen px-4 py-8 w-full mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-12"
        whileHover={{ scale: 1.03 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create Pet
        </h2>
        <form className="space-y-3 mt-12 px-12 border-gray-200" onSubmit={handleSubmit}>
          <motion.input
            type="text"
            name="name"
            placeholder="Pet Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <option value="">Select Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </motion.select>
          <motion.input
            type="text"
            name="breed"
            placeholder="Breed"
            value={formData.breed}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </motion.select>
          <motion.textarea
            name="notes"
            placeholder="Additional Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          ></motion.textarea>
          <motion.input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
         
          <motion.button
            type="submit"
            className="p-8 text-sm bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 focus:outline-none"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            Add Pet
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePet;
