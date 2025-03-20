import React, { useEffect, useState } from 'react';


export const LoginPage: React.FC = () => {
    const [emailController, setEmailController] = useState<string>("");
    const [passwordController, setPasswordController] = useState<string>("");

    useEffect(() => {

    }, [])

    return(
      <div className='h-screen flex justify-center align-middle shadow-md'>
        <div className='flex flex-col justify-center'>
          {/* Book svg */}
          <img src="/images/books.svg" width={250} alt="books" />
          {/* login form */}
          <div className='bg-green-800 p-6 rounded-2xl'>
            <div>
              <p className='font-semibold text-2xl'>Login</p>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="email-in">Email</label>
              <input type="email" placeholder='email' id='email-in' className='my-input' />
            </div>
          </div>
        </div>
      </div>
    );
}
