import React, { useState } from "react";

const QueryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    petName: "",
    petAge: "",
    petBreed: "",
    queryType: "",
    message: "",
    contactMethod: "email",
    contactInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you can handle form submission (e.g., API call to save the query)
    console.log("Form Submitted", formData);
  };

  return (
    <div className="container mx-auto px-6 sm:px-8 py-10 mt-20">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-white mb-4">
        Pet Care Query Form
      </h2>
      <p className="text-center text-gray-300 mb-8 text-sm sm:text-lg mt-20">
        Fill out the form below with your pet's details and your inquiry, and
        our team will get back to you as soon as possible.
      </p>

      <div className="text-center mt-6 text-gray-400">
        <p>Please create the form later onwards.</p>
      </div>
    </div>
  );
};

export default QueryForm;
