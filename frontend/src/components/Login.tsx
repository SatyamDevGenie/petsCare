import React, { useState } from "react";
import { loginUser } from "../services/userService";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(dispatch, { email, password });
      navigate("/");
      
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-14">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-16 rounded-xl shadow-lg w-full max-w-md transform transition-all hover:scale-105 hover:shadow-2xl"
    >
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Login
      </h2>
    
      {error && (
        <div className="text-red-600 text-center text-sm mb-4 border border-red-400 rounded p-2 bg-red-50">
          {error}
        </div>
      )}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-sm text-white py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition duration-200"
      >
        Login
      </button>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account ?{' '}
          <Link
            to="/register"
            className="text-purple-500 hover:text-purple-700 underline transition"
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  </div>
  );
};

export default Login;
