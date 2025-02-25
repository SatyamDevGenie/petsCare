import bcrypt from "bcryptjs";


const doctors = [
    {
      name: "Dr. Ramesh Kumar",
      email: "ramesh.kumar@gmail.com",
      password: bcrypt.hashSync("doctor123", 10),
      specialization: "Veterinary Surgeon",
      contactNumber: "9876543210",
      profileImage: "/images/male-doctor.png", // Replace with actual image URL or path
      notes: "Specializes in surgical procedures and emergency cases. Compassionate and thorough.",
      isDoctor: true,
      availability: "Mon-Tue Evening 6:00-8:00 PM"
    }
  ];
  
  export default doctors;
  