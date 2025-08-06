// App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./components/HomePage";
import CreateEvent from "./components/CreateEvent";
import Profile from "./components/UserProfile";
import Login from "./components/Login";
import Signup from "./components/Registration"; // <-- Your updated registration form
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import EventsPage from "./pages/EventsPage";
import SearchPage from "./pages/SearchResultPage";

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };

 const hideHeaderRoutes = ["/", "/login", "/signup"];
 const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

import LandingPage from "./pages/LandingPage";
import CreateEvent from "./components/EventForm";
import Profile from "./components/ProfileCard";
// import Login from "./pages/Login";
import Signup from "./components/Registration";
import Search from "./pages/Search";
import EventDetails from "./pages/EventDetails";

const App = () => {

  return (
    <>
      {shouldShowHeader && <Header user={loggedInUser} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />

        {/* <Route path="/home" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/profile" element={<Profile />} /> */}

        <Route
          path="/home"
          element={
            <ProtectedRoute user={loggedInUser}>
              <HomePage user={loggedInUser} />
            </ProtectedRoute>
          }
        />


        <Route
          path="/create-event"
          element={
            <ProtectedRoute user={loggedInUser}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
  path="/profile"
  element={
    <ProtectedRoute user={loggedInUser}>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route path="/search" element={<Search />} />
        <Route path="/event/:id" element={<EventDetails />} />
          
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppWrapper;