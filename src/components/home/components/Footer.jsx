import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer({ gap }) {
  return (
    <footer
      className="absolute left-56  text-gray-400 px-6 py-10"
      style={{ bottom: `${gap}px` }}
    >
      {/* Top: Social Icons */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex md:flex-col gap-6 md:gap-0">
          <div className="flex gap-6 mb-4">
            <a href="#" className="hover:text-white transition text-2xl">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition text-2xl">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Links, grouped in columns */}
        <div className="grid grid-cols-2  sm:grid-cols-4 gap-x-14 gap-y-6 w-full">
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-white transition">
              Audio Description
            </a>
            <a href="#" className="hover:text-white transition">
              Investor Relations
            </a>
            <a href="#" className="hover:text-white transition">
              Legal Notices
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-white transition">
              Help Centre
            </a>
            <a href="#" className="hover:text-white transition">
              Jobs
            </a>
            <a href="#" className="hover:text-white transition">
              Cookie Preferences
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-white transition">
              Gift Cards
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition">
              Corporate Information
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-white transition">
              Media Centre
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-10 text-xs text-gray-500 text-center">
        © 1997–{new Date().getFullYear()} MovieApp, Inc.
      </div>
    </footer>
  );
}
