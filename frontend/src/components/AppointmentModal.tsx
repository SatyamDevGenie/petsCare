import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { bookAppointmentService } from "../services/appointmentService";
import { Root } from "react-dom/client";
import toast from "react-hot-toast";

interface Pet {
  _id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  notes: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  singleDoctor: {
    name: string | number | readonly string[] | undefined;
    _id: string;
  };
}


const AppointmentModal: React.FC<ModalProps> = ({
    singleDoctor,
    isOpen,
    onClose,
  }) => {

    const { userInfo } = useSelector((state: RootState) => state.user);

    const petsList = useSelector<RootState, Pet[]>(
      (state) => state.pets.petsList
    );

    const { bookAppointment } = useSelector(
      (state: RootState) => state.appointment
    );
    
    const [formData, setFormData] = useState({
      petOwner: userInfo?._id || "",
      petId: "",
      doctorId: singleDoctor?._id || "",
      appointmentDate: "",
      query: "",
      status: "Pending",
      doctorResponse: "Pending",
    });
  
    useEffect(() => {}, [petsList, bookAppointment]);
  
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.petId || !formData.doctorId || !formData.appointmentDate) {
        console.error("Missing required fields:", formData);
        return;
      }
      console.log("Appointment booked:", formData);
      const appointment = {
        ...formData,
      };
      dispatch(bookAppointmentService(appointment));

        // Show success toast
        toast.success(`${userInfo.name} Booked Appointment`, {
          style: {
            fontSize: "14px", // Smaller text size
            padding: "8px",   // Reduce padding
            minWidth: "200px", // Reduce width
            fontFamily:"Arial Black",
            fontWeight:"bolder"
          },
        });

      navigate("/doctors");
      onClose();
    };
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white max-w-2xl mx-auto rounded-lg p-6 shadow-lg w-full">
          <h2 className="text-2xl text-gray-800 font-bold text-center mb-4">
            Book Appointment
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Pet Owner
                </label>
                <input
                  type="text"
                  name="petOwner"
                  value={userInfo.name}
                  onChange={handleChange}
                  readOnly
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>
  
              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Pet
                </label>
                <select
                  name="petId"
                  value={formData.petId}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                >
                  <option value="">Select a Pet</option>
                  {petsList.map((pet) => (
                    <option key={pet._id} value={pet._id}>
                      {pet.breed}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Specialization */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Doctor
                </label>
                <input
                  type="text"
                  name="doctor"
                  value={singleDoctor.name}
                  onChange={handleChange}
                  readOnly
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>
  
              {/* Contact Number */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>
  
              {/* Notes */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Query
                </label>
                <input
                  type="text"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>
              <div className="hidden">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  readOnly
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>
              <div className="hidden">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Doctor Response
                </label>
                <input
                  type="text"
                  name="doctorResponse"
                  value={formData.doctorResponse}
                  onChange={handleChange}
                  readOnly
                  className="w-full border rounded px-3 py-2 text-gray-700 text-sm font-normal"
                />
              </div>
            </div>
  
            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default AppointmentModal;
