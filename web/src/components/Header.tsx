import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../api/UserController";


const Header: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn()){
      setLoggedIn(true);
    }
    
  }, []);
  return (
    <div className="grid grid-cols-7 grid-rows-1 gap-0">
      {/* logo & image */}
      <div className="col-span-2 row-span-1">
        <div className="flex justify-baseline">
          <Link to="/">
            <img 
              src="../images/android-chrome-512x512.png"
              alt="logo-image" 
              height={46} 
              width={46}
              className="m-common"
              />
          </Link>
        </div>
      </div>
      {/* List of routes */}
      <div className="col-span-4 row-span-1">
        <div className="flex justify-between">
          <Link to="/collections" className="p-common">Collections</Link>
          <Link to="/explore" className="p-common">Explore</Link>
          <Link to="/social" className="p-common">Social</Link>
        </div>
      </div>
      <div className="col-span-1 row-span-1" style={{display: loggedIn ? "none": "block"}}>
        <div className="flex justify-center">
          <Link to="/profile" className="p-common">Profile</Link>
        </div>
      </div>

      {/* Login and sign up */}
      <div className="col-span-1 row-span-1" style={{display: loggedIn ? "block": "none"}}>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>

  );
};

export default Header;
