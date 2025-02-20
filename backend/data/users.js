import bcrypt from "bcryptjs";

const users = [
  {
    name: "Administrator",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Satyam",
    email: "satyam@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: false,
  },
  {
    name: "Akshay",
    email: "akshay@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: false,
  },
];

export default users;
