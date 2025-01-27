import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchServices } from "../services/adminServices";
import { Link } from "react-router-dom";
// Define the service interface
interface Service {
  id: string;
  _id: string;
  title: string;
  description: string;
  price: number;
}

const Services: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Access the state of all services from Redux
  const { allServices } = useSelector((state: RootState) => state.services);

  // Fetch all services on component mount
  useEffect(() => {
    dispatch(fetchServices);
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 ">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-8">
        Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
        {allServices && allServices.length > 0 ? (
          allServices.map((service: Service) => (
            <Link to={`/service/${service._id}`}>
              <div
                key={service.id}
                className="bg-white text-gray-900 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {service.title}
                  </h3>
                  {/* <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p> */}
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-green-500">
                      ${service.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No Services found</p>
        )}
      </div>
    </div>
  );
};

export default Services;