import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dateOfBirth: "",
    });
    setErrors({});
    setShowPassword(false);
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name should be at least 3 letters and contain only letters and spaces.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number should be 10 digits.";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain letters and numbers.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    } else if (new Date(formData.dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of birth cannot be in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { confirmPassword, ...payload } = formData;

      // Gender type must match backend enum ("MALE", "FEMALE", "OTHER")
      payload.gender = payload.gender.toUpperCase();

      const response = await axios.post("http://localhost:5000/api/v1/auth/register", payload);
      
      if(response.data?.statusCode === 200){
        toast.success("Successfully Registered.");
        navigate("/login");
        return;
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Please check inputs or server.");
    }
  };

  const renderError = (field) =>
    errors[field] ? <p className="text-sm text-red-500 mt-1">{errors[field]}</p> : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 px-4 py-10">
      <div className="w-full max-w-3xl bg-white p-8 sm:p-12 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {renderError("name")}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {renderError("phoneNumber")}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            {renderError("email")}
          </div>

          {/* Gender + DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              {renderError("gender")}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {renderError("dateOfBirth")}
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {renderError("password")}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {renderError("confirmPassword")}
            </div>
          </div>

          {/* Show Password */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="showPassword" className="text-sm">
              Show Password
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Register
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="w-full sm:w-1/2 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition font-semibold"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
