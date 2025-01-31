import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { updateDoctor } from "../services/doctorService";
import toast from "react-hot-toast";

interface ModalProps {
  singleDoctor: {
    _id: string;
    name: string;
    email: string;
    specialization: string;
    contactNumber: string;
    notes: string;
  } | null;
  isOpen: Boolean;
  onClose: () => void;
}

const EditDoctorModal: React.FC<ModalProps> = React.memo(
  ({ singleDoctor, isOpen, onClose }) => {
    // Destructure singleService
    if (!isOpen) return null;
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name: singleDoctor?.name,
      email: singleDoctor?.email,
      specialization: singleDoctor?.specialization,
      contactNumber: singleDoctor?.contactNumber,
      notes: singleDoctor?.notes,
    });

    
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value, // Value is always a string
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await dispatch(
          updateDoctor({
            _id: singleDoctor?._id,
            name: formData?.name,
            email: formData?.email,
            specialization: formData?.specialization,
            contactNumber: formData?.contactNumber,
            notes: formData?.notes,
          })
        );
        navigate("/doctors");
        // Show success toast
        toast.success("Doctor Updated Successfully !", {
          style: {
            fontSize: "14px", // Smaller text size
            padding: "8px", // Reduce padding
            minWidth: "200px", // Reduce width
            fontFamily: "Arial Black",
            fontWeight: "bolder",
          },
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    return (
      <>
        {singleDoctor ? (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl sm:w-96">
              <div className="px-4 py-3 pb-0 border-b border-gray-200 flex justify-between">
                <h3 className="text-xl font-semibold text-gray-900 my-4 mt-2">
                  Update Doctor {/* Use singleService.title */}
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
                  {/* Grid Container */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">
                    {/* Name */}
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                      />
                    </div>

                    {/* Specialization */}
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Specialization
                      </label>
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                      />
                    </div>

                    {/* Notes (Full Width) */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Notes
                      </label>
                      <input
                        type="text"
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal mb-8"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
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
  }
);

export default EditDoctorModal;
