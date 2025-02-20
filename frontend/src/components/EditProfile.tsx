import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../services/userService";
import { motion } from "framer-motion"; // Import Framer Motion

const EditProfile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const updatedUser = await updateUser(dispatch, { name, email, password });
      setSuccess("Profile updated successfully!");
      setName(updatedUser.name || "");
      setEmail(updatedUser.email || "");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 m-3">
      <motion.div
        className="bg-white p-8 md:p-16 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl"
        initial={{ opacity: 0, y: -50 }} // Initial state of the component
        animate={{ opacity: 1, y: 0 }} // Animated state
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-medium text-center mb-4 text-gray-800">
          Edit Profile
        </h2>

        {error && (
          <motion.div
            className="mb-3 text-red-500 text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="mb-3 text-green-500 text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 py-6">
            <label
              className="block text-xs font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all duration-300"
              placeholder="Name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-xs font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all duration-300"
              placeholder="Email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-xs font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all duration-300"
              placeholder="New Password"
            />
          </div>

          <div className="flex space-x-2 mt-4">
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded text-sm shadow hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Save
            </motion.button>

            <motion.button
              type="button"
              onClick={() => {
                setName("");
                setEmail("");
                setPassword("");
              }}
              className="w-full bg-red-500 text-white py-2 rounded text-sm shadow hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-300 transition-all duration-300 transform hover:scale-105"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Reset
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfile;
