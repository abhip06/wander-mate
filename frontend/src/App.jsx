
// import RegistrationForm from "./components/Registration";
// import ProfileCard from "./components/ProfileCard";
// import EventForm from "./components/EventForm";
// import LandingPage from "./pages/LandingPage";  

// const mockUser = {
//   name: "Cat Lee",
//   location: "Pune, India",
//   email: "cat@gmail.com",
//   phoneNumber: "+91-9876543210",
//   gender: "Female",
//   dateOfBirth: "2000-01-01",
//   interests: ["Traveling", "Hiking", "Photography"],
//   avatar: "https://randomuser.me/api/portraits/women/90.jpg",
// };


// function App() {

//   return (
//     <>
//       <div >
//       {/* <RegistrationForm /> */}
//      {/* <ProfileCard user={mockUser} /> */}
//      {/* <EventForm /> */}
//      <LandingPage />
//     </div>
//     </>
//   )
// }

// export default App


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CreateEvent from "./components/EventForm";
import Profile from "./components/ProfileCard";
// import Login from "./pages/Login";
import Signup from "./components/Registration";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};


export default App;
