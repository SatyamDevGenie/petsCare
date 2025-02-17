import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { fetchSingleService, cancelService } from "../services/adminServices";
import Modal from "./Modal";
import toast from "react-hot-toast";

const SingleService: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  type ServiceParams = { service_id: string };
  const { service_id } = useParams<ServiceParams>();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const { SingleService } = useSelector((state: any) => state.services);

  useEffect(() => {
    if (service_id) {
      dispatch(fetchSingleService(service_id));
    }
  }, [dispatch, service_id]);



  const handleDelete = async () => {
    if (SingleService) {
      try {
        await dispatch(cancelService(SingleService)); // Dispatch the delete action
        navigate("/services"); // Redirect to services page after deletion

        // Show success toast
      toast.success("Service Deleted", {
        style: {
          fontSize: "14px", // Smaller text size
          padding: "8px",   // Reduce padding
          minWidth: "200px", // Reduce width
          fontFamily:"Arial Black",
          fontWeight:"bolder"
        },
      });

      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };


  return (
    <div className="container mx-auto px-8 py-12 mt-24 max-w-5xl">
      {SingleService ? (
        <div className="bg-white text-gray-900 max-w-3xl mx-auto rounded-xl shadow-xl p-12 mt-10 border border-gray-200">
          <h2 className="text-center text-3xl font-bold mb-6 text-indigo-700">
            {SingleService.title}
          </h2>
          <p className="text-center text-gray-700 text-lg leading-relaxed mb-6">
            {SingleService.description}
          </p>
          <p className="text-center text-blue-600 font-semibold text-xl mb-6">
            Price: ${SingleService.price}
          </p>
          {userInfo?.isAdmin && (
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
              >
                Edit
              </button>
              <button
              onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          )}
          <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            singleService={SingleService}
          />
        </div>
      ) : (
        <p className="text-center text-gray-400 text-xl">Loading service details...</p>
      )}
    </div>
  );
};

export default SingleService;
