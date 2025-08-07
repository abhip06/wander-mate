import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    // Here you can integrate with backend or send to email
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Optionally, show confirmation for a few seconds
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-indigo-600 text-center mb-6">Contact Wander Mate</h2>
        <p className="text-gray-600 text-center mb-8">
          Have a question, suggestion, or just want to say hello? We'd love to hear from you!
        </p>
        {submitted && (
          <div className="mb-4 text-green-600 text-center font-medium">
            ✅ Thank you! Your message has been sent.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Type your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;