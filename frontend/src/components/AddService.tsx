import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { createService as addServiceAPI } from "../services/adminServices";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AddService: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (userInfo && userInfo.isAdmin) {
        const newService = {
          ...formData,
          price: parseFloat(formData.price),
        };

        await dispatch(addServiceAPI(newService));

        toast.success("Service added successfully!", {
          style: {
            fontSize: "14px",
            padding: "8px",
            minWidth: "200px",
            fontFamily: "Arial Black",
            fontWeight: "bolder",
          },
        });

        navigate("/services");
      } else {
        toast.error("You are not authorized to add a service!", {
          style: {
            fontSize: "14px",
            padding: "8px",
            minWidth: "200px",
            fontFamily: "Arial Black",
            fontWeight: "bolder",
          },
        });
      }
    } catch (error: any) {
      console.error("Failed to add service:", error.message);
      toast.error("Failed to add service. Please try again!");
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12 mt-12 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="w-full max-w-sm sm:max-w-md bg-white shadow-xl rounded-3xl p-6"
        whileHover={{ scale: 1.02, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)" }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl p-3 font-bold text-center text-black mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Create a New Service
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6 p-8 sm:p-4">
          {/* Title Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label
              htmlFor="title"
              className="block text-lg sm:text-xl font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="text-sm sm:text-base w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter service title"
            />
          </motion.div>

          {/* Description Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label
              htmlFor="description"
              className="block text-lg sm:text-xl font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="text-sm sm:text-base w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Enter service description"
            />
          </motion.div>

          {/* Price Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label
              htmlFor="price"
              className="block text-lg sm:text-xl font-medium text-gray-700 mb-2"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full text-sm sm:text-base p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter service price"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <button
              type="submit"
              className="w-full text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              Add Service
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddService;
