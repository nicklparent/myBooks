import React, { useEffect, useState } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { loginWithEmailAndPassword } from "../api/UserController";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  //log user in with with the provided email and password
  async function login(event: React.FormEvent): Promise<void>{
    event.preventDefault();

    const user = await loginWithEmailAndPassword(email, password);
    //set errors if the function return an API error
    if ("error" in user){
      setError(`Error: ${user.error}`);
    }

    if ("id" in user){
      window.location.href = "/";
    }
  }

  function setErrorMessage(message: string): void {
    const errorBox = document.querySelector("#error-box");
    if (errorBox) {
      errorBox.innerHTML = `<div class="text-red-600">${message}</div>`;
    }
  }


  useEffect(() => {
    if (error){
      setErrorMessage(error);
    }
  }, [error]);


  return (
    <div
      className="flex justify-center items-center shadow-md min-h-screen w-full"
      style={{
        background: "radial-gradient(circle at 30% 30%, #2C3E50 10%, #1A535C 30%, #A68B5B 60%, #0B3D91 90%)",
      }}
    >
      <div className="flex flex-col items-center bg-off-white p-6 md:p-10 rounded-2xl shadow-lg 
                      w-10/12 md:w-1/3 xl:w-1/4 h-auto md:h-1/3 lg:h-1/3">
        {/* svg logo */}
        <img src="/images/books.svg" width={150} md-width={200} alt="Books" className="mb-4" />
        {/* Main form section */}
        <form onSubmit={login} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="email-in" className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="text"
              id="email-in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password-in" className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password-in"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            {/* Forgot password field 
              TODO: impliment forgot password process 
            */}
            <button className="flex justify-baseline my-button !p-0">
              <p className="text-sm text-cyan-700">Forgot Password?</p>
            </button>

            {/* Pop up an error box for responsiveness upon misinput */}
            <div className="error-box"></div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
          <div className="w-full flex justify-end">
            <button type="button"
              className="my-button flex items-center gap-1"
              onClick={() => window.location.href = "/create-account"}
            >
              <p className="text-lg mr-2 text-blue-700">New Reader?</p>
              <FaArrowRightFromBracket color="#1447e6"/>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
