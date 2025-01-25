import React from "react";

const CreatePet: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-6 py-12 mt-40 mb-20 w-full"> {/* Increased margin on top and bottom */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-5">Create Pet</h2>

        <form className="space-y-2 pt-5">
          {/* Pet Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Pet Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          {/* Pet Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Pet Type
            </label>
            <select
              id="type"
              name="type"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Pet Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Pet Age (in years)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              required
              min="0"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          {/* Image URL */}
          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
            //   onChange={handleImageChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
        
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white text-xl font-semibold py-2 rounded-lg shadow-md hover:bg-teal-700 transition-all"
            >
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePet;


