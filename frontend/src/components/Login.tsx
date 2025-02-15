import React, { useState } from "react";
import { loginUser } from "../services/userService";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { LoginDoctor } from "../services/doctorService";
import { AppDispatch } from "../redux/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("user"); // Default user => petOwner

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (role === "doctor") {
        await dispatch(LoginDoctor({ email, password }));
      } else {
        await loginUser(dispatch, { email, password });
      }

      // Show success toast
      toast.success("Login successfully !", {
        style: {
          fontSize: "14px", // Smaller text size
          padding: "8px", // Reduce padding
          minWidth: "200px", // Reduce width
          fontFamily: "Arial Black",
          fontWeight: "bolder",
        },
      });

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");

      toast.error("Can't able to login", {
        style: {
          fontSize: "14px", // Smaller text size
          padding: "8px", // Reduce padding
          minWidth: "200px", // Reduce width
          fontFamily: "Arial Black",
          fontWeight: "bolder",
        },
      });
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen mt-14"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-16 rounded-xl shadow-lg w-full max-w-md transform transition-all"
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <motion.h2
          className="text-3xl font-extrabold text-center mb-6 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Login
        </motion.h2>

        {error && (
          <motion.div
            className="text-red-600 text-center text-sm mb-4 border border-red-400 rounded p-2 bg-red-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {error}
          </motion.div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Login as:
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your email"
            required
          />
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your password"
            required
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-sm text-white py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition duration-200"
          whileHover={{ scale: 1.05 }}
        >
          Login
        </motion.button>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-500 hover:text-purple-700 underline transition"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Login;
