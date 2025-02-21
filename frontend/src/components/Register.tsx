import React, { useState } from "react";
import { registerUser } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(dispatch, { name, email, password });

      // Show success toast
      toast.success("Register Successfully !", {
        style: {
          fontSize: "14px", // Smaller text size
          padding: "8px",   // Reduce padding
          minWidth: "200px", // Reduce width
          fontFamily:"Arial Black",
          fontWeight:"bolder"
        },
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
      toast.error("You are not authorized to add a service !", {
        style: {
          fontSize: "14px", // Smaller text size
          padding: "8px",   // Reduce padding
          minWidth: "200px", // Reduce width
          fontFamily:"Arial Black",
          fontWeight:"bolder"
        },
      });
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-16 rounded-xl shadow-lg w-full max-w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.h2
          className="text-4xl font-medium text-center mb-6 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Register
        </motion.h2>

        {error && (
          <motion.div
            className="text-red-600 text-center text-sm mb-4 border border-red-400 rounded p-2 bg-red-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        )}
        <div className="mb-6 mt-10">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <motion.input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your name"
            required
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <motion.input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your email"
            required
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <motion.input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your password"
            required
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r font-extrabold from-green-500 to-blue-500 text-sm text-white py-3 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition duration-200"
          whileHover={{ scale: 1.03, backgroundColor: "#22c55e" }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-sm text-gray-600">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="text-green-500 hover:text-green-700 transition font-extrabold"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Register;
