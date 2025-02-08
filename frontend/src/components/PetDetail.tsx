import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchSinglePet, updatePet, deletePet } from "../services/petsService";
import { RootState, AppDispatch } from "../redux/store";
import EditPetModal from "./EditPetModel";

interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  notes: string;
  gender: string;
  image: string;
  type: string;
}

const PetDetail: React.FC<Pet> = () => {
  const { petId } = useParams(); // Get petId from URL
  const dispatch = useDispatch<AppDispatch>(); // Correctly type dispatch
  const navigate = useNavigate();

  const [isOpen, setisOpen] = useState<boolean>(false);

  // Access the state for the single pet data
  const { pet } = useSelector((state: any) => state.pets);
  const isLoading = !pet && petId; // Check if pet is loading and `petId` exists
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (petId) {
      dispatch(fetchSinglePet(petId)); // Dispatch the action to fetch the pet by ID
    }
  }, [dispatch, petId, updatePet]); // Adding dependencies to the useEffect to re-run when `petId` changes

  // Handle loading state
  if (isLoading) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  // Handle no pet found scenario
  if (!pet) {
    return (
      <div className="text-center text-xl text-red-500">Pet not found</div>
    );
  }


  const handleDelete = async () => {
    try {
      dispatch(deletePet(pet._id));
      navigate("/");
    } catch (error: any) {
      console.error("Error deleting service:", error);
    }
  };


  return (
    <>
      <div className="max-w-3xl mx-auto p-12 shadow-2xl rounded-lg  bg-white mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Pet Image Section */}
          <div className="flex w-80 h-96 justify-center items-center  rounded-lg overflow-hidden shadow-xl">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-80 h-96 size-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Pet Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-5xl font-bold text-gray-800 mb-4">
                {pet.name}
              </h2>
              <div className="text-lg text-gray-600 mb-6 space-y-4">
                <p className="font-semibold text-gray-800">
                  <span className="text-teal-600">Breed:</span> {pet.breed}
                </p>
                <p className="font-semibold text-gray-800">
                  <span className="text-teal-600">Gender:</span> {pet.gender}
                </p>
                <p className="font-semibold text-gray-800">
                  <span className="text-teal-600">Age:</span> {pet.age} years
                </p>
                <p className="font-semibold text-gray-800">
                  <span className="text-teal-600">Type:</span> {pet.type}
                </p>
                <p className="font-semibold text-gray-800 mb-6">
                  <span className="font-semibold  text-teal-600">
                    Description:
                  </span>{" "}
                  {pet.notes}
                </p>
              </div>
            </div>

            {userInfo && userInfo.isAdmin && (
              <div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setisOpen(true)}
                    className="text-sm bg-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                   <button
                    onClick={handleDelete}
                    className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <EditPetModal
          pet={pet}
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
        />

      </div>


      {/* Button Section */}
      <div className=" mt-6 mb-6 text-left ">
        <Link to="/">
          <button className="bg-teal-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 text-lg">
            Back to Pets List
          </button>
        </Link>
      </div>
    </>
  );
};

export default PetDetail;











// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, Link } from "react-router-dom";
// import { fetchSinglePet } from "../services/petsService";
// import { RootState, AppDispatch } from "../redux/store";
// import { motion } from "framer-motion";

// interface Pet {
//   _id: string;
//   name: string;
//   breed: string;
//   age: number;
//   notes: string;
//   image: string;
//   type: string;
//   gender: string;
// }

// const PetDetail: React.FC<Pet> = () => {
//   const { petId } = useParams(); // Get petId from URL
//   const dispatch = useDispatch<AppDispatch>(); // Correctly type dispatch

//   // Access the state for the single pet data
//   const { pet } = useSelector((state: any) => state.pets);
//   const isLoading = !pet && petId; // Check if pet is loading and `petId` exists

//   useEffect(() => {
//     if (petId) {
//       dispatch(fetchSinglePet(petId)); // Dispatch the action to fetch the pet by ID
//     }
//   }, [dispatch, petId]); // Adding dependencies to the useEffect to re-run when `petId` changes

//   // Handle loading state
//   if (isLoading) {
//     return <div className="text-center text-xl text-gray-600">Loading...</div>;
//   }

//   // Handle no pet found scenario
//   if (!pet) {
//     return <div className="text-center text-xl text-red-500">Pet not found</div>;
//   }

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 2 } },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
//   };

//   const buttonVariants = {
//     hover: { scale: 1.1 },
//     tap: { scale: 0.95 },
//   };

//   return (
//     <motion.div
//       className="max-w-7xl mx-auto p-12 shadow-xl rounded-lg mt-16 bg-white"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* Pet Image Section */}
//         <motion.div
//           className="flex justify-center items-center w-full rounded-lg overflow-hidden shadow-xl"
//           variants={imageVariants}
//         >
//           <img
//             src={pet.image}
//             alt={pet.name}
//             className="h-50 object-fit rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
//           />
//         </motion.div>

//         {/* Pet Details Section */}
//         <div className="flex flex-col justify-between space-y-6">
//           <motion.div
//             className="text-lg text-gray-600 space-y-4"
//             variants={containerVariants}
//           >
//             <h2 className="text-4xl font-bold text-gray-800">{pet.name}</h2>
//             <p className="font-semibold text-gray-800">
//               <span className="text-teal-600">Breed:</span> {pet.breed}
//             </p>
//             <p className="font-semibold text-gray-800">
//               <span className="text-teal-600">Age:</span> {pet.age} years
//             </p>
//             <p className="font-semibold text-gray-800">
//               <span className="text-teal-600">Type:</span> {pet.type}
//             </p>
//             <p className="font-semibold text-gray-800">
//               <span className="text-teal-600">Description:</span> {pet.notes}
//             </p>
//             <p className="font-semibold text-gray-800">
//               <span className="text-teal-600">Gender:</span> {pet.gender}
//             </p>
//           </motion.div>

//           {/* Button Section */}
//           <motion.div
//             className="flex justify-center mt-6"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//           >
//             <Link to="/">
//               <button className="bg-teal-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 text-lg">
//                 Back to Pets List
//               </button>
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default PetDetail;
