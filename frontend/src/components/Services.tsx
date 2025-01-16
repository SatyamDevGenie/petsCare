import React from "react";

const Services: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8">
        Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Service Card 1 */}
        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4">Pet Grooming</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Our professional grooming services ensure your pet looks and feels
            their best. From nail trimming to full grooming packages, we cover
            it all.
          </p>
        </div>

        {/* Service Card 2 */}
        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4">Pet Walking</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Regular walks are essential for a happy, healthy pet. Let our
            experienced walkers take your furry friend out for some fun and
            exercise.
          </p>
        </div>

        {/* Service Card 3 */}
        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4">Veterinary Care</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Our expert veterinary team provides top-notch medical care, ensuring
            your pets stay healthy and receive the attention they deserve.
          </p>
        </div>

        {/* Additional Service Card (if needed) */}
        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4">Pet Sitting</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Heading out? Leave your pets in safe hands with our caring and
            reliable pet sitting services.
          </p>
        </div>

        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4">Pet Training</h3>
          <p className="text-gray-300 text-base leading-relaxed">
            Help your pet learn new tricks or improve their behavior with our
            professional training programs tailored to their needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
