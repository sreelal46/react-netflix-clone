import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const changeRoute = () => {
    if (location.pathname === "/") return navigate("/signup");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Left: Logo + Menu */}
      <div className="flex items-center space-x-20">
        <img src={Logo} className="h-20 ml-20" alt="logo" />
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={changeRoute}
          className=" font-bold bg-[#db0000] hover:bg-red-700  px-5 py-1.5 rounded-md"
        >
          {location.pathname === "/signup" ? "Login" : "Sign Up"}
        </button>
      </div>
    </nav>
  );
}
