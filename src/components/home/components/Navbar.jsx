import React, { useState, useRef, useEffect } from "react";
import Logo from "../../../assets/logo.png";
import Avatar from "../../../assets/avatar.png";
import { FaSearch, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config"; // make sure this path is correct
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shows", path: "/shows" },
    { name: "Movie", path: "/movie" },
    { name: "New & Popular", path: "/new-popular" },
    { name: "My List", path: "/my-list" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutFun = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="bg-gradient-to-b from-[#141414] to-transparent absolute -top-1 h-10 w-full"></div>
      <nav className="absolute top-2 left-0 w-full  z-50 flex items-center justify-between px-6 md:px-12 py-3">
        {/* Left: Logo + Menu */}
        <div className="flex items-center space-x-8">
          <img src={Logo} alt="logo" className="h-12" />

          <ul className="hidden md:flex space-x-6 font-sans text-white text-sm">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => setActive(item.name)}
                  className={`${
                    active === item.name
                      ? "font-bold text-lg"
                      : "font-normal text-lg"
                  } hover:text-gray-300 transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Icons + Avatar */}
        <div className="flex items-center space-x-4 relative">
          {/* Search */}
          <div className="relative">
            <FaSearch
              className="text-white text-xl cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            />
            <input
              type="text"
              placeholder="Search..."
              className={`absolute right-0 top-0 mt-10 w-48 px-3 py-1 rounded bg-gray-800 text-white
              transform transition-all duration-300 ease-in-out
              ${
                showSearch
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
            />
          </div>

          {/* Notification Bell */}
          <FaBell className="text-white text-xl cursor-pointer" />

          {/* Avatar Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={Avatar}
              alt="avatar"
              className="h-10 rounded-md cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            <div
              className={`absolute right-0 mt-2 w-40 bg-black rounded-md shadow-lg text-white py-2 z-50
              transform transition-all duration-300 ease-in-out
              ${
                showDropdown
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-800"
                onClick={logoutFun}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
