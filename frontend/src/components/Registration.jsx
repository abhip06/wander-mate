import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name can't be blank.";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name must be at least 3 characters and letters only.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email can't be blank.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number can't be blank.";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password can't be blank.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include letters and numbers.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password can't be blank.";
    } else if (formData.password !== formData.confirmPassword) {
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
      payload.gender = payload.gender.toUpperCase();

      const response = await axios.post("http://localhost:8080/api/v1/auth/register", payload);
      alert("Registration successful!");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dateOfBirth: "",
      });
      setTouched({});
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Please check your inputs or try again later.");
    }
  };

  const renderError = (field) => {
    if (!touched[field]) return null;
    return errors[field] ? (
      <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
    ) : null;
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 px-4 py-10">
        <div className="w-full max-w-3xl bg-white p-8 sm:p-12 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Create an Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                  onBlur={handleBlur}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                onBlur={handleBlur}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {renderError("email")}
            </div>

            {/* Gender & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                  onBlur={handleBlur}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {renderError("dateOfBirth")}
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                  onBlur={handleBlur}
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
              <label htmlFor="showPassword" className="text-sm">Show Password</label>
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
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    confirmPassword: "",
                    gender: "",
                    dateOfBirth: "",
                  });
                  setTouched({});
                  setErrors({});
                }}
                className="w-full sm:w-1/2 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition font-semibold"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterForm;



// import React, { useState } from "react";
// import axios from "axios";

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//     dateOfBirth: "",
//   });

//   const [touched, setTouched] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     if (touched[e.target.name]) {
//       validateField(e.target.name, e.target.value);
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     const newErrors = { ...errors };

//     switch (name) {
//       case "name":
//         if (!value) newErrors.name = "This field cannot be blank.";
//         else if (!/^[a-zA-Z\s]{3,}$/.test(value))
//           newErrors.name = "Name must be at least 3 characters.";
//         else delete newErrors.name;
//         break;

//       case "email":
//         if (!value) newErrors.email = "This field cannot be blank.";
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           newErrors.email = "Invalid email format.";
//         else delete newErrors.email;
//         break;

//       case "phoneNumber":
//         if (!value) newErrors.phoneNumber = "This field cannot be blank.";
//         else if (!/^[0-9]{10}$/.test(value))
//           newErrors.phoneNumber = "Phone number should be 10 digits.";
//         else delete newErrors.phoneNumber;
//         break;

//       case "password":
//         if (!value) newErrors.password = "This field cannot be blank.";
//         else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value))
//           newErrors.password =
//             "Password must be 8+ characters with letters and numbers.";
//         else delete newErrors.password;
//         break;

//       case "confirmPassword":
//         if (!value) newErrors.confirmPassword = "This field cannot be blank.";
//         else if (value !== formData.password)
//           newErrors.confirmPassword = "Passwords do not match.";
//         else delete newErrors.confirmPassword;
//         break;

//       case "gender":
//         if (!value) newErrors.gender = "Please select a gender.";
//         else delete newErrors.gender;
//         break;

//       case "dateOfBirth":
//         if (!value) newErrors.dateOfBirth = "Date of birth is required.";
//         else if (new Date(value) > new Date())
//           newErrors.dateOfBirth = "Date of birth cannot be in the future.";
//         else delete newErrors.dateOfBirth;
//         break;

//       default:
//         break;
//     }

//     setErrors(newErrors);
//   };

//   const validateForm = () => {
//     Object.keys(formData).forEach((key) => {
//       validateField(key, formData[key]);
//     });
//     return Object.keys(errors).length === 0;
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       phoneNumber: "",
//       password: "",
//       confirmPassword: "",
//       gender: "",
//       dateOfBirth: "",
//     });
//     setErrors({});
//     setTouched({});
//     setShowPassword(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     try {
//       const payload = { ...formData, gender: formData.gender.toUpperCase() };
//       delete payload.confirmPassword;

//       const res = await axios.post(
//         "http://localhost:8080/api/v1/auth/register",
//         payload
//       );
//       alert("Registration successful!");
//       resetForm();
//     } catch (err) {
//       alert(
//         err.response?.data?.message || "Registration failed. Please try again."
//       );
//     }
//   };

//   const renderError = (field) =>
//     touched[field] && errors[field] ? (
//       <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
//     ) : null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex justify-center items-center p-6">
//       <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl">
//         <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
//           Create an Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name and Phone */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 font-medium">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               {renderError("name")}
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Phone Number</label>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               {renderError("phoneNumber")}
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//             {renderError("email")}
//           </div>

//           {/* Gender & DOB */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 font-medium">Gender</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               >
//                 <option value="">Select</option>
//                 <option value="MALE">Male</option>
//                 <option value="FEMALE">Female</option>
//                 <option value="OTHER">Other</option>
//               </select>
//               {renderError("gender")}
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               {renderError("dateOfBirth")}
//             </div>
//           </div>

//           {/* Passwords */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-1 font-medium">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               {renderError("password")}
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               {renderError("confirmPassword")}
//             </div>
//           </div>

//           {/* Show Password */}
//           <div className="flex items-center space-x-2 text-sm">
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={() => setShowPassword(!showPassword)}
//             />
//             <label>Show Password</label>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 pt-4">
//             <button
//               type="submit"
//               className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
//             >
//               Register
//             </button>
//             <button
//               type="button"
//               onClick={resetForm}
//               className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition font-semibold"
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;
