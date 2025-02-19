import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Services from "./components/Services";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import PetDetail from "./components/PetDetail";
import CreatePet from "./components/CreatePet";
import SingleService from "./components/SingleService";
import Doctors from "./components/Doctors";
import SingleDoctor from "./components/SingleDoctor";
import AddService from "./components/AddService";
import { Toaster } from "react-hot-toast";
import AllAppointments from "./components/AllAppointments";

const App: FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Toast Notifications */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:service_id" element={<SingleService />} />
            <Route path="/create/Service" element={<AddService />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctor/:doctor_id" element={<SingleDoctor />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route 
              path="/pets/:petId" 
              element={
                <PetDetail 
                  _id={""} 
                  name={""} 
                  breed={""} 
                  age={0} 
                  notes={""} 
                  image={""} 
                  type={""} 
                  gender={""} 
                />
              } 
            />
            <Route path="/create-pet" element={<CreatePet />} />
            <Route path="/*" element={<AllAppointments />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
