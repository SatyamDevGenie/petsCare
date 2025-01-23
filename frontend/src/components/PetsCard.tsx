import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface PetCardProps {
  _id: string;
  name: string;
  type: string;
  gender: string;
  petImage: string;
}

const PetsCard: React.FC<PetCardProps> = ({
  _id,
  name,
  type,
  petImage,
  gender,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Link to={`/pets/${_id}`} className="block">
        <div className="bg-white p-7 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={petImage}
            alt={name}
            className="w-full h-35 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-extrabold text-white mb-2 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">{name}</h2>
          <p className="text-gray-600 mb-1">
            <span className="text-sm font-extrabold text-black mb-2"> 
              Type:
            </span>{" "}
            <span className="text-sm font-semibold text-gray-800 mb-2"> 
              {type}
            </span>
          </p>
          <p className="text-gray-600">
            <span className="text-sm font-extrabold text-black mb-2"> 
              Gender:
            </span>{" "}
            <span className="text-sm font-semibold text-gray-800 mb-2"> 
              {gender}
            </span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default PetsCard;