import React from 'react';
import '../css/header.css';
import '../css/globals.css';

export function Header(){

    return(
        <div className='header w-full between-center padding'>
            <a href='./'>My Books!</a>
            <div>
                <label htmlFor="search-in"></label>
                <input type="text" id='search-in' placeholder='search' className='text-input'/>
            </div>
        </div>
    );
}

export default Header;