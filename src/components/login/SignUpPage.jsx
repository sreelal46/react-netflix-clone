import React from "react";
import LandingImg from "../../assets/login.jpg";
import Navbar from "./NavbarLog";
import Footer from "../home/components/Footer";
import SignUpForm from "./SignUpForm";
export default function LoginPage() {
  return (
    <div className=" relative h-screen w-full">
      {/* Background */}
      <img
        src={LandingImg}
        alt="landing background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/80"></div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Centered Form */}
      <div className=" relative z-10 flex items-center justify-center h-full">
        <SignUpForm />
      </div>
      <Footer />
    </div>
  );
}
