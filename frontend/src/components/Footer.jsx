import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow mt-10 py-4 text-center text-gray-600">
      &copy; {new Date().getFullYear()} Wander Mate. All rights reserved.
    </footer>
  );
};

export default Footer;
