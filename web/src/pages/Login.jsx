import React, { useState } from 'react';
import '../assets/css/login.css';

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginType, setLoginType] = useState("login");

    const createAccountHandler = async () => {
        const response = await fetch('http://localhost:5053/user', {
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
        if (data.message === 'Account created Successfully') {
            setLoggedIn(true);
        }
    }

    const loginHandler = () => {
        // Implement your login logic here
    }

    const toggleLoginType = () => {
        setLoginType(prevType => prevType === "login" ? "register" : "login");
    }

    if (loggedIn) {
        window.location.href = 'http:localhost:3000/';
    }

    return (
        <div className='center screen'>
            <div className='signin-page' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                

                {loginType === "login" ? (
                    // Login Side
                    <div className='login'>
                        <div className='login-header'>
                            <h1 className='header-title'>Welcome Back!</h1>
                            <h3 className='header-subtitle'>Login</h3>
                        </div>
                        <div className='input-field'>
                            <label htmlFor="email-login">Email</label>
                            <input
                                type='email'
                                name='email-login'
                                id='email-login'
                                className='input-in'
                                placeholder='example@mybooks.com'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='input-field'>
                            <label htmlFor="password-login">Password</label>
                            <input
                                type='password'
                                name='password-login'
                                id='password-login'
                                className='input-in'
                                placeholder='Enter Password'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button onClick={loginHandler} className='sign-in-btn btn'>Sign In</button>
                        </div>
                    </div>
                ) : (
                    // Create account side
                    <div className='register'>
                        <h2>New Reader?</h2>
                        <h3>Register</h3>
                        <div className='input-field'>
                            <label htmlFor="email-login-register">Email</label>
                            <input
                                type='email'
                                name='email-login'
                                id='email-login-register'
                                className='input-in'
                                placeholder='example@mybooks.com'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-field'>
                            <label htmlFor="password-login-register">Password</label>
                            <input
                                type='password'
                                name='password-login-register'
                                id='password-login-register'
                                className='input-in'
                                placeholder='Enter Password'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='input-field'>
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type='text'
                                name='first-name'
                                id='first-name'
                                className='input-in'
                                placeholder='First Name'
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className='input-field'>
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                type='text'
                                name='last-name'
                                id='last-name'
                                className='input-in'
                                placeholder='Last Name'
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                        <div className='input-field'>
                            <label htmlFor="user-name">Username</label>
                            <input
                                type='text'
                                name='user-name'
                                id='user-name'
                                className='input-in'
                                placeholder='Username'
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                        <button onClick={createAccountHandler} className='sign-in btn'>Create Account</button>
                    </div>
                )}
                <button onClick={toggleLoginType} className='toggle-btn'>
                    {loginType === "login" ? "New reader? Create an account" : "Already have an account?"}
                </button>
            </div>
        </div>
    );
}