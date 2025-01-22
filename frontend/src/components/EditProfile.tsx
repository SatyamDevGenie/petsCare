import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../services/userService";

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
    <div className="flex justify-center items-center min-h-screen px-4 mt-9">
      <div className="bg-white p-8 md:p-16 rounded-xl shadow-lg w-full max-w-md transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-800">
          Edit Profile
        </h2>

        {error && (
          <div className="mb-3 text-red-500 text-center text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-3 text-green-500 text-center text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 py-3">
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="New Password"
            />
          </div>

          <div className="flex space-x-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded text-sm shadow hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => {
                setName("");
                setEmail("");
                setPassword("");
              }}
              className="w-full bg-red-500 text-white py-2 rounded text-sm shadow hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
