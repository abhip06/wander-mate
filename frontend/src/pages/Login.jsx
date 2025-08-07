import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData,
        {
          withCredentials: true
        }
      );
      if(response.status === 200){
        navigate("/");
        return;
      }
    } catch (error) {
      if (error.response) {
        setMessage("❌ " + error.response.data.message);
      } else {
        setMessage("⚠️ Error connecting to server.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 px-4">
      <div className="bg-white shadow-lg rounded-lg px-10 py-12 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to Wander Mate
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username or Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 *:">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-sm font-medium text-red-600">
            {message}
          </p>
        )}

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
