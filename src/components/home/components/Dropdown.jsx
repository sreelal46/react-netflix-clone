import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { genres } from "../../../Genres";

export default function GenresDropdown({ weNeed }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {weNeed && (
        <div ref={dropdownRef} className="relative inline-block text-left z-50">
          {/* Button */}

          <button
            onClick={() => setOpen((prev) => !prev)}
            className=" absolute -top-[790px] left-64 px-4 flex items-center  py-1 bg-black/50 text-white border border-white text-sm font-semibold hover:bg-black"
          >
            Genres
            {open ? (
              <RiArrowDropUpLine className="text-3xl" />
            ) : (
              <RiArrowDropDownLine className="text-3xl" />
            )}
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute   -top-[755px] left-64 mt-1 w-[600px] bg-black/50 text-white shadow-lg p-4 grid grid-cols-3 gap-4 z-50">
              {genres.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition"
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
