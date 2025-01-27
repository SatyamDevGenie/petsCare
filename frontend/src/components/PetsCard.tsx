import React from "react";
import { Link } from "react-router-dom";


interface PetCardProps {
  _id: string;
  name: string;
  type: string;
  gender: string;
  image: string;
}

const PetsCard: React.FC<PetCardProps> = ({
  _id,
  name,
  type,
  image,
  gender,
}) => {
  return (
    
      <Link to={`/pet/${_id}`} className="block">
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 mt-5">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg mb-4 transition-all duration-300 ease-in-out transform hover:scale-10"
          />
          <h2 className="text-lg font-extrabold text-white mb-2 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-2 py-1 rounded-full">
            {name}
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="text-sm font-extrabold text-black">Type:</span>{" "}
            <span className="text-sm font-semibold text-gray-800">{type}</span>
          </p>
          <p className="text-gray-600">
            <span className="text-sm font-extrabold text-black">Gender:</span>{" "}
            <span className="text-sm font-semibold text-gray-800">{gender}</span>
          </p>
        </div>
      </Link>
    
  );
};

export default PetsCard;
