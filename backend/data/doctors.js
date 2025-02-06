import bcrypt from "bcryptjs";


const doctors = [
    {
      name: "Dr. Ramesh Kumar",
      email: "ramesh.kumar@gmail.com",
      // password: bcrypt.hashSync("doctor123", 10),
      specialization: "Veterinary Surgeon",
      contactNumber: "9876543210",
      profileImage: "/images/male-doctor.png", // Replace with actual image URL or path
      notes: "Specializes in surgical procedures and emergency cases. Compassionate and thorough.",
      isDoctor: true,
    },
    {
      name: "Dr. Priya Sharma",
      email: "priya.sharma@gmail.com",
      // password: bcrypt.hashSync("doctor123", 10),
      specialization: "Exotic Animal Specialist",
      contactNumber: "9123456789",
      profileImage: "/images/female-doctor.png", // Replace with actual image URL or path
      notes: "Experienced in handling and treating exotic animals like reptiles and birds.",
      isDoctor: true,
    },
    {
      name: "Dr. Arjun Mehta",
      email: "arjun.mehta@gmail.com",
      // password: bcrypt.hashSync("doctor123", 10),
      specialization: "General Veterinarian",
      contactNumber: "9988776655",
      profileImage: "/images/male-doctor.png", // Replace with actual image URL or path
      notes: "Focuses on preventive care and general health checkups for pets.",
      isDoctor: true,
    },
  ];
  
  export default doctors;
  