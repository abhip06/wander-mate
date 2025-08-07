import axios from "../Api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData?.data);

  const handleLogOut = async () => {
    try {
      await axios.post("/api/v1/auth/logout", { withCredentials: true });
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-md sticky top-0 z-50">
      <NavLink to="/">
        <div className="text-3xl font-extrabold text-blue-800 hover:tracking-wide transition-all duration-300">
          Wander Mate
        </div>
      </NavLink>
      <ul className="hidden md:flex items-center space-x-8 text-base text-gray-700 font-medium">
        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        {authStatus && <li><Link to="/profile" className="hover:text-blue-600">Profile</Link></li>}
        <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>

        {authStatus ? (
          <>
            <li>
              <span className="text-gray-600 font-semibold">Hi, {userData?.name}</span>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="bg-gray-500 text-white px-4 py-1.5 rounded-md hover:bg-gray-600 flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 font-semibold shadow">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="bg-blue-200 text-black px-4 py-1.5 rounded-md hover:bg-blue-300 font-semibold shadow">
                  Sign Up
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
