import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';

import './css/header.css';


export const ProfileDropDown: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return (() => {
            document.removeEventListener("mousedown", handleClickOutside);
        })
    }, []);


    return (
        <div className='relative' ref={dropDownRef}>
            <button onClick={toggleDropDown} className='flex items-center'>
                <CgProfile className='text-2xl mr-1' />
            </button>

            {isOpen && (
                <div className='absolute right-0 mt-2 w-40 border rounded-lg shadow-lg'>
                    <ul className='py-2 *:m-1'>
                        <li>
                            <Link to='/profile'>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className='flex items-center'>
                                <p className='mr-2'>Logout</p>
                                <FiLogOut />
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>    
    );
}