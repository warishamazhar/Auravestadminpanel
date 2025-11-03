import React, { useEffect } from "react";
import {
  FaTwitter,
  FaTelegramPlane,
  FaInstagram,
  FaMedium,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineUpload } from "react-icons/hi";
import { MainContent } from "../../constants/mainContent";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#footer") {
      const element = document.getElementById("footer");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);
  return (
    <footer className="bg-[#151515] text-white py-12 px-6 lg:px-16 xl:px-28 2xl:px-52" id="footer">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="lg:w-[45%]">
          <a href="/" data-discover="true">
            <img
              src={MainContent.appLogo}
              alt="PoxScan Logo"
              className="w-36 mb-5"
            />
          </a>
          <p className="text-base mb-4 text-gray-400">
            The Best Blockchain Explorer of {MainContent.appName}
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-5 my-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMedium className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200" />
            </a>
            <a href="@" target="_blank" rel="noopener noreferrer">
              <FiExternalLink className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200" />
            </a>
          </div>

          <p className="text-sm mt-6 text-gray-500">
            Copyright© 2021-2025 {MainContent.appName}
          </p>
        </div>

        {/* Right Section */}
        <div className="lg:w-[50%] flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-semibold text-lg mb-8">About us</p>
            <a
              className="block text-gray-400 hover:text-white transition my-2"
              href="/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms & Conditions
            </a>
            <a
              className="block text-gray-400 hover:text-white transition my-2"
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              className="block text-gray-400 hover:text-white transition my-2"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Polink
            </a>
          </div>

          <div>
            <p className="font-semibold text-lg mb-8">Support</p>
            <a
              className="block text-gray-400 hover:text-white transition my-2"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              API
            </a>
            <a
              className="block text-gray-400 hover:text-white transition my-2"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Advertise
            </a>
            <a
              className="block text-gray-400 hover:text-white transition my-2"
              href="/support"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </div>

          <div>
            <p className="font-semibold text-lg mb-8">Resources</p>
            <a
              className="block text-gray-400 hover:text-white transition my-2"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yumeko ETF
            </a>
            <a
              className="block text-gray-400 hover:text-white transition my-2"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yumeko Architecture
            </a>
            <a
              className="block text-gray-400 hover:text-white transition my-2"
              href="/assets/Whitepaper-B-cMWwqu.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yumeko Whitepaper
            </a>
          </div>

          <div className="mt-6 lg:mt-0 flex justify-center cursor-pointer">
            <HiOutlineUpload className="w-8 h-8 text-white hover:text-gray-400 transition" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
