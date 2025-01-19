import React, { useState } from "react";
import { registerUser } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-16">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-16 rounded-xl shadow-lg w-full max-w-md transform transition-all hover:scale-105 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Register
        </h2>
       
        {error && (
          <div className="text-red-600 text-center text-sm mb-4 border border-red-400 rounded p-2 bg-red-50">
            {error}
          </div>
        )}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-sm text-white py-3 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition duration-200"
        >
          Register
        </button>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account ?{' '}
            <Link
              to="/login"
              className="text-green-500 hover:text-green-700 underline transition"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
  
};

export default Register;
