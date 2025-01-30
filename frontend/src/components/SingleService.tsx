import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { fetchSingleService } from "../services/adminServices";
import Modal from "./Modal";


const SingleService: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // const { service_id } = useParams<{ servid: string }>(); // not working

  type ServiceParams = { service_id: string };
const { service_id } = useParams<ServiceParams>();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const { SingleService } = useSelector((state: any) => state.services);

  console.log(SingleService, "SingleService");

  useEffect(() => {
    if (service_id) {
      dispatch(fetchSingleService(service_id)); // Fetch the service by ID
    }
  }, [dispatch, service_id]);

 

  return (
    <div className="container mx-auto px-6 py-8 mt-20">
      {SingleService ? (
        <div className="bg-white text-gray-800 max-w-md mx-auto rounded-lg shadow-lg p-6 mt-10">
          <h2 className="text-center text-2xl font-semibold mb-4">
            {SingleService.title}
          </h2>
          <p className="text-center text-gray-600 text-xl leading-relaxed mb-4">
            {SingleService.description}
          </p>
          <p className="text-center text-blue-400 font-semibold mb-4">
            Price: ${SingleService.price}
          </p>
          {userInfo?.isAdmin && (
            <div className="flex justify-between items-center">
              <button
                onClick={() => setOpenModal(true)}
                className="text-sm bg-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
        <p className="text-center text-gray-300">Loading service details...</p>
      )}
    </div>
  );
};

export default SingleService;






