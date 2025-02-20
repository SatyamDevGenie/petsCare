import React from "react";
import { Link } from "react-router-dom";

interface PetCardProps {
  _id: string;
  name: string;
  type: string;
  gender: string;
  image: string;
}

const PetsCard: React.FC<PetCardProps> = ({ _id, name, type, image, gender }) => {
  return (
    <Link to={`/pets/${_id}`} className="block">
      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 mt-4">
        <div className="w-full h-75 overflow-hidden rounded-sm">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h2 className="text-lg font-bold text-gray-800 mt-3 text-center">{name}</h2>
        <div className="text-sm text-gray-600 mt-1">
          <p>
            <span className="font-semibold text-gray-700">Type:</span> {type}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Gender:</span> {gender}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PetsCard;








