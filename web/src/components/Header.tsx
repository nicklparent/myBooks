import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPreferences, isLoggedIn } from "../api/UserController";
import { RiBookShelfLine } from "react-icons/ri";
import { MdExplore } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "../assets/css/header.css";


const Header: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  
  
  useEffect(()=> {
    if (isLoggedIn()){
      setLoggedIn(true);
    }
  }, []);
  
  return (
    <div className="header *:m-2 shadow-md">
      {/* logo & image */}
      <div className="">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/images/android-chrome-512x512.png"
              alt="logo-image"
              height={46}
              width={46}
              className="m-common"
            />
            <span className="ml-2 font-bold text-lg">MyBooks</span>
          </Link>
        </div>
      </div>
      
      {/* List of routes */}
      <div className="">
        <div className="flex justify-center items-center h-full space-x-8">
          <Link to="/collection" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
            <RiBookShelfLine className="text-2xl" />
            <span className="text-sm">Collection</span>
          </Link>
          <Link to="/explore" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
            <MdExplore className="text-2xl" />
            <span className="text-sm">Explore</span>
          </Link>
          <Link to="/social" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
            <FaUserFriends className="text-2xl" />
            <span className="text-sm">Social</span>
          </Link>
        </div>
      </div>
      
      {/* Profile button for logged-in users */}
      <div className="" style={{display: loggedIn ? "block": "none"}}>
        <div className="flex justify-end items-center h-full">
          <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600">
            <CgProfile className="text-2xl mr-1" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
      
      {/* Login and sign up for non-logged in users */}
      <div className="" style={{display: loggedIn ? "none": "block"}}>
        <div className="flex justify-center items-center h-full space-x-4">
          <Link to="/login" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Header;