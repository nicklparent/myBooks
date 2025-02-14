import React from 'react';
import { FiBook } from 'react-icons/fi';
import '../assets/css/globals.css';
import '../assets/css/header.css';

export function Header(){
    //handle the search function
    const searchHandler = () => {
        
    }
    return(
        <div className='header w-full between-center padding'>
            {/* Logo sectiom */}
            <a href='./'>My Books!</a>
            {/* Function Buttons */}
            <div className='app-bar'>
                <a href="./books">
                {/* Books image */}
                <FiBook color='black' size={22}/>
                </a>
                <a href="./collections">
                {/* bookshelf image */}
                </a>
                <a href="./explore">
                {/* explore icon */}
                </a>
                <a href="./connections">
                {/* people icon */}
                </a>
            </div>
            {/* Search bar */}
            <div className='search'>
                <input type="text" id='search-in' placeholder='search' className='text-input'/>
                <button className='search-button' onClick={searchHandler}>
                    <svg width="17" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
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