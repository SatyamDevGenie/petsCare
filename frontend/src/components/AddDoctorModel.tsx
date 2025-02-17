import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDoctor } from "../services/doctorService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDoctorModal: React.FC<AddDoctorModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    contactNumber: "",
    notes: "",
    availability: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createDoctor(formData));
    // Show success toast
    toast.success("Doctor Added", {
      style: {
        fontSize: "14px", // Smaller text size
        padding: "8px", // Reduce padding
        minWidth: "200px", // Reduce width
        fontFamily: "Arial Black",
        fontWeight: "bolder",
      },
    });
    navigate("/doctors");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          Add Doctor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full border rounded-md px-3 py-1 text-sm"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border rounded-md px-3 py-1 text-sm"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border rounded-md px-3 py-1 text-sm"
          />
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            required
            className="w-full border rounded-md px-3 py-1 text-sm"
          />
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            required
            className="w-full border rounded-md px-3 py-1 text-sm"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full border rounded-md px-3 py-1 text-sm"
          ></textarea>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="Availability"
            required
            className="w-full border rounded-md px-3 py-1 text-sm"
          />
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm bg-gray-400 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;

