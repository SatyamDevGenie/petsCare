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

  // Static Discount Offer (Example: 20% Discount)
  const staticDiscount = 20; // Static discount in percentage
  const originalPrice = SingleService?.price || 100; // Default price if not available
  const discountedPrice = originalPrice - (originalPrice * staticDiscount) / 100;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 max-w-lg sm:max-w-3xl mb-12">
      {SingleService ? (
        <div className="bg-white text-gray-900 rounded-lg shadow-md p-6 sm:p-10 border border-gray-200">
          <h2 className="text-2xl sm:text-4xl font-medium text-center text-gray-900 mb-12">
            {SingleService.title}
          </h2>
          <p className=" text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-semibold text-justify">
            {SingleService.description}
          </p>

          {/* Discount Offer UI (Static) */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md text-center mb-6">
            <p className="text-lg sm:text-xl font-bold">🔥 Limited Time Offer!</p>
            <p className="text-gray-600 font-medium">
              Get <span className="text-red-500 font-extrabold">{staticDiscount}% OFF</span> on this service.
            </p>
          </div>

          {/* Price Section with Discount Applied */}
          <div className="text-center mb-6">
            <p className="text-gray-500 line-through font-semibold text-lg sm:text-xl">
              Original Price: ${originalPrice}
            </p>
            <p className="text-green-600 font-extrabold text-lg sm:text-xl">
              Discounted Price: ${discountedPrice.toFixed(2)}
            </p>
          </div>

          {userInfo?.isAdmin && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
              <button
                onClick={() => setOpenModal(true)}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-2 sm:py-3 sm:px-6 rounded-lg text-sm sm:text-lg transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2  sm:py-3 sm:px-6 rounded-lg text-sm sm:text-lg transition duration-300"
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










