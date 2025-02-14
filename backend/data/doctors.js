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
    },
    {
      name: "Dr. Priya Sharma",
      email: "priya.sharma@gmail.com",
      password: bcrypt.hashSync("doctor123", 10),
      specialization: "Exotic Animal Specialist",
      contactNumber: "9123456789",
      profileImage: "/images/female-doctor.png", // Replace with actual image URL or path
      notes: "Experienced in handling and treating exotic animals like reptiles and birds.",
      isDoctor: true,
      availability: "Wed-Thu Evening 6:00-8:00 PM"
    },
    {
      name: "Dr. Arjun Mehta",
      email: "arjun.mehta@gmail.com",
      password: bcrypt.hashSync("doctor123", 10),
      specialization: "General Veterinarian",
      contactNumber: "9988776655",
      profileImage: "/images/male-doctor.png", // Replace with actual image URL or path
      notes: "Focuses on preventive care and general health checkups for pets.",
      isDoctor: true,
      availability: "Wed-Thu Evening 6:00-8:00 PM"
    },
  ];
  
  export default doctors;
  