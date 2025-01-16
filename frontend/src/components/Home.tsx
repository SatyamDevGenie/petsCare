import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-indigo-50 to-white">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-indigo-800 mb-4">
        Welcome to petsCare!
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-center text-gray-700 mb-8 px-2 sm:px-8">
        Your one-stop solution for all pet care needs. We ensure your pets get the best care and love they deserve.
      </p>
    </div>
  );
};

export default Home;
