import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice";
import { useEffect, useState } from "react";
import axios from "./Api";

import Layout from "./Layout";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./components/Registration";
import Search from "./pages/Search";
import EventDetails from "./pages/EventDetails";

// Components
import EventForm from "./components/EventForm";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Spinner from "./components/Spinner";
// import NotFound from "./pages/NotFound"; // optional fallback page

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchCurrentUserData = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(
        "/api/v1/users/me",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data?.statusCode === 200) {
        dispatch(login(response.data))
      } else {
        dispatch(logout())
      }

    } catch (error) {

      dispatch(logout())

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentUserData();
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="create-event" element={<EventForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
        <Route path="event/:id" element={<EventDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    )
  );

  return loading ? (
    <Spinner />
  ) : (
    <RouterProvider router={router} />
  )
};

export default App;
