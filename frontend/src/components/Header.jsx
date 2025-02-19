import React, { useState } from 'react';
import { FiBook } from 'react-icons/fi';
import { RiBookShelfLine } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import { MdMenu, MdOutlineExplore } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import '../assets/css/globals.css';
import '../assets/css/header.css';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const iconSize = 25;

    return (
        <div className='header w-full between-center padding'>
            <div className='app-bar'>
                {/* Mobile Menu Icon */}
                <div className={`mobile-menu-icon ${isMenuOpen ? 'rotate' : ''}`} onClick={toggleMenu}>
                    <MdMenu color='black' size={iconSize} />
                </div>
                <a href='./' className='title'>My Books!</a>
                {/* Function Buttons */}
                <div className={`app-bar-content ${isMenuOpen ? 'open' : ''}`}>
                    <a href="./books">
                        <FiBook color='black' size={iconSize}/> <p>Books</p>
                    </a>
                    <a href="./collections">
                        <RiBookShelfLine color='black' size={iconSize}/> <p>Collections</p>
                    </a>
                    <a href="./explore">
                        <MdOutlineExplore color='black' size={iconSize}/> <p>Explore</p> 
                    </a>
                    <a href="./connections">
                        <FaUserFriends color='black' size={iconSize}/> <p>Connect</p> 
                    </a>
                </div>
            </div>
            {/* Search bar */}
            <div className='search'>
                <input type="text" id='search-in' placeholder='Search' className='text-input'/>
                <button className='search-button'>
                    <svg width="17" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    Search
                </button>
            </div>
            <a href="./profile">
                {/* account icon */}
                <FaBookOpenReader color='navy' size={iconSize} className='profile-img'/>
            </a>
        </div>
    );
}

export default Header;
