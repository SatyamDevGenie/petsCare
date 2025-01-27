import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { fetchSingleService } from "../services/adminServices";
import { FaDollarSign } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const SingleService: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { service_id } = useParams<{ service_id: string }>(); // Use the service ID from the URL

  // Access SingleService from the Redux store
  const { SingleService } = useSelector((state: any) => state.services);

  useEffect(() => {
    if (service_id) {
      dispatch(fetchSingleService(service_id)); // Fetch the service by ID
    }
  }, [dispatch, service_id]);

  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      {SingleService ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden mt-5">
          <div className="p-6 sm:p-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-600 text-center">
              {SingleService.title}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-center text-base sm:text-lg font-medium">
              {SingleService.description}
            </p>
            <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-extrabold text-green-500 mb-6">
              <FaDollarSign className="text-xl sm:text-2xl" />
              <span>${SingleService.price}</span>
            </div>
            <div className="flex justify-center mt-6 sm:mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full text-sm sm:text-lg shadow-md transition-transform transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="text-blue-500 animate-spin text-4xl" />
          <p className="ml-4 text-gray-600 text-lg">Loading service details...</p>
        </div>
      )}
    </div>
  );
};

export default SingleService;
