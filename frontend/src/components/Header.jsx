import React from 'react';
import { FiBook } from 'react-icons/fi';
import { RiBookShelfLine } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import '../assets/css/globals.css';
import '../assets/css/header.css';

export function Header(){
    //handle the search function
    const iconSize = 25;
    const searchHandler = () => {
        console.log("Works");
        
    }
    return(
        <div className='header w-full between-center padding'>
            {/* Logo sectiom */}
            <a href='./'>My Books!</a>
            {/* Function Buttons */}
            <div className='app-bar'>
                <a href="./books">
                {/* Books image */}
                <FiBook color='black' size={iconSize}/>
                </a>
                <a href="./collections">
                {/* bookshelf image */}
                <RiBookShelfLine color='black' size={iconSize}/>
                </a>
                <a href="./explore">
                {/* explore icon */}
                </a>
                <a href="./connections">
                {/* people icon */}
                <FaUserFriends color='black' size={iconSize}/>
                </a>
            </div>
            {/* Search bar */}
            <div className='search'>
                <input type="text" id='search-in' placeholder='Search' className='text-input'/>
                <button className='search-button' onClick={searchHandler}>
                    <svg width="17" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    Search
                </button>
            </div>
            <a href="./profile">
            {/* account icon */}
            </a>
        </div>
    );
}

export default Header;