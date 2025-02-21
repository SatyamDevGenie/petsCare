import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateService } from "../services/adminServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ModalProps {
  singleService: {
    _id: string;
    title: string;
    description: string;
    price: number;
  } | null;
  isOpen: Boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ singleService, isOpen, onClose }) => {
  if (!isOpen) return null;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: singleService?.title,
    description: singleService?.description,
    price: singleService?.price,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        updateService({
          _id: singleService?._id,
          title: formData.title,
          description: formData.description,
          price: formData.price,
        })
      );

      // Show success toast
      toast.success("Service Updated", {
        style: {
          fontSize: "14px", // Smaller text size
          padding: "8px",   // Reduce padding
          minWidth: "200px", // Reduce width
          fontFamily:"Arial Black",
          fontWeight:"bolder"
        },
      });

      navigate("/services");
    } catch (error: any) {
      throw new Error(error.message);

      toast.success("Something went wrong !", {
        style: {
          fontSize: "14px", // Smaller text size
          padding: "8px",   // Reduce padding
          minWidth: "200px", // Reduce width
          fontFamily:"Arial Black",
          fontWeight:"bolder"
        },
      });
    }
  };

  return (
    <>
      {singleService ? (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl sm:w-96">
            <div className="px-4 py-3 pb-0 border-b border-gray-200 flex justify-between">
              <h3 className="text-xl font-bold text-gray-900 my-4 mt-2">
                Update Service
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>

            <div className="pb-0">
              <form onSubmit={handleSubmit} className="pt-4">
                <div className="mb-4 mx-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    required
                    className="font-normal text-sm shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4 mx-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-3"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="font-normal text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-9 mx-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor="price"
                  >
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="font-normal text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="px-4 py-3 bg-gray-100 flex justify-between gap-2">
                  <button
                    onClick={onClose}
                    className="px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Modal;
