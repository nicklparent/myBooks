/**
 * UI will be a book where the first page login options and the second page is createaccount options
 * 
 */

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../assets/css/login.css';
export function Login(){
    
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    
    const createAccountHandler = async () => {
        const response = fetch('http://localhost:5053/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Email: email,
                Password: password,
                FirstName: firstName,
                LastName: lastName,
                UserName: userName
            })
        });

        const data = await response.json();
        if (data.message == 'Account created Succsesfully'){
            setLoggedIn(true);
        }
    }

    useEffect(() => {

    }, []);

    if (loggedIn){
        window.location.href = 'http:localhost:3000/';
    }

    return (
        <div className='center screen'>
            <div className='signin-page'>
                {/* Login Side */}
                <div className='login'>
                    <h2>Welcome Back!</h2>
                    <div className='input-field'>
                        <label htmlFor="email-login">Email</label>
                        <input type='email' name='email-login' id='email-login' className='input-in' placeholder='example@mybooks.com'/>
                    </div>
                </div>
                <div className='middle-line'>

                </div>
                {/* Create account side */}
                <div className='register'>
                    <h2>New Reader?</h2>
                    
                </div>
            </div>
        </div>
    );
}

