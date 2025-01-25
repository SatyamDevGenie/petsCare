import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import necessary components
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import PetDetail from "./components/PetDetail";

const App: FC = () => {
  return (
    <Router>
      <div className="h-screen flex items-center w-full flex-col font-extrabold text-4xl">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<UserProfile />}  />
          <Route path="/edit" element={<EditProfile />} />
           <Route path="/pets/:petId" element={<PetDetail _id={""} name={""} breed={""} age={0} notes={""} image={""} type={""} />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;