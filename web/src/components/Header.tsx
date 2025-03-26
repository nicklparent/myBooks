import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currentUser } from "../api/UserController";
import { RiBookShelfLine } from "react-icons/ri";
import { MdExplore } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "../assets/css/header.css";
import { ProfileDropDown } from "../assets/profile-drop";
import { jwtDecode } from "jwt-decode";


const Header: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  
  
  useEffect(()=> {        
    const checkUser = async () => {
      const user = await currentUser();
      setLoggedIn(user !== null);
    }
    checkUser();
  }, []);
  
  return (
    <div className="header-parent">
      <div className="header *:m-2">
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
        <div className="w-full">
          <div className="flex h-full justify-around">
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
          <ProfileDropDown />
        </div>
        
        {/* Login and sign up for non-logged in users */}
        <div className="" style={{display: loggedIn ? "none": "block"}}>
          <div className="flex justify-center items-center h-full space-x-4">
            <Link to="/login" className="px-4 py-2 rounded bg-amber-900 text-white hover:bg-amber-700 hover:scale-105">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Header;