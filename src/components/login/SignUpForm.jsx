import React, { useState } from "react";
import { FaChevronRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passErr, setPassErr] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const navigate = useNavigate();

  // Email validation
  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email is required");
      setEmailValid(false);
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setEmailValid(false);
    } else {
      setError("");
      setEmailValid(true);
    }
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // Password validation
    if (!password) {
      setPassErr("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPassErr("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPassErr("");
    }

    if (!emailValid) isValid = false;

    if (isValid) {
      setError(""); // Clear previous errors
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed up:", user);
          navigate("/login"); // Navigate after successful signup
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message); // Show Firebase error
        });
    }
  };

  return (
    <div className="text-center text-white px-6 min-h-screen flex flex-col justify-center">
      <h1 className="text-6xl font-bold mb-6">Join Netflix Today</h1>
      <p className="text-xl mb-6">
        Create your account and enjoy unlimited movies and TV shows.
      </p>
      <p className="text-lg mb-6">Enter your email to start your membership.</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 w-full max-w-md mx-auto"
      >
        {/* Email Field */}
        <div className="flex flex-col w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder="Email Address"
            className={`px-4 py-3 rounded bg-black/70 border ${
              error ? "border-red-500" : "border-gray-600"
            } text-white focus:outline-none focus:ring-2 ${
              error ? "focus:ring-red-500" : "focus:ring-lime-600"
            }`}
          />
          {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>

        {/* Password Field */}
        <AnimatePresence>
          {emailValid && (
            <motion.div
              key="password-field"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col w-full relative mt-2"
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`px-4 py-3 rounded bg-black/70 border ${
                  passErr ? "border-red-500" : "border-gray-600"
                } text-white focus:outline-none focus:ring-2 ${
                  passErr ? "focus:ring-red-500" : "focus:ring-lime-600"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-4 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {passErr && (
                <span className="text-red-500 text-sm mt-1">{passErr}</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-red-600 hover:bg-red-700 text-white font-semibold w-full px-6 py-3 rounded flex items-center justify-center gap-2 ${
            !emailValid ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={!emailValid}
        >
          {emailValid ? (
            "Sign Up"
          ) : (
            <>
              Get Started <FaChevronRight className="text-sm" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
