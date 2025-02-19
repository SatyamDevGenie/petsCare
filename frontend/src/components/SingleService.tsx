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
        await dispatch(cancelService(SingleService)); 
        navigate("/services"); 

        toast.success("Service Deleted", {
          style: {
            fontSize: "14px",
            padding: "8px",
            minWidth: "200px",
            fontFamily: "Arial Black",
            fontWeight: "bolder",
          },
        });
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 max-w-lg sm:max-w-3xl">
      {SingleService ? (
        <div className="bg-white text-gray-900 rounded-lg shadow-md p-6 sm:p-10 border border-gray-200">
          <h2 className="text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-indigo-700">
            {SingleService.title}
          </h2>
          <p className="text-center text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-semibold">
            {SingleService.description}
          </p>
          <p className="text-center text-blue-600 font-extrabold text-lg sm:text-xl mb-4 sm:mb-6">
            Price: ${SingleService.price}
          </p>

          {userInfo?.isAdmin && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
              <button
                onClick={() => setOpenModal(true)}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg text-sm sm:text-lg transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg text-sm sm:text-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          )}

          <Modal isOpen={openModal} onClose={() => setOpenModal(false)} singleService={SingleService} />
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg sm:text-xl">Loading service details...</p>
      )}
    </div>
  );
};

export default SingleService;
