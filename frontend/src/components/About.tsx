import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
        About Us
      </h2>

      {/* Who We Are Section */}
      <section className="mb-12">
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
          Who We Are
        </h3>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          At <span className="text-teal-400 font-bold">petsCare</span>, we are committed to delivering exceptional care and services for your pets. 
          Since our founding in 2010, we have been dedicated to enhancing the lives of pets and their owners through professional grooming, walking, 
          sitting, and veterinary care. Our team’s unwavering passion for animals drives us to create a safer, happier, and more enriching experience for pets and their families.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12">
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
          Our Mission
        </h3>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          Our mission is to provide unparalleled care, fostering a deep connection between pets and their families. 
          We strive to be the trusted partner in every pet owner's journey, combining compassion, excellence, and innovation to ensure the best for your pets.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
