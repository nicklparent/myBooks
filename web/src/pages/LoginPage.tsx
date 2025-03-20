import React, { useState } from "react";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div
      className="flex justify-center items-center shadow-md"
      style={{
        height: "85dvh",
        background: "radial-gradient(circle at 30% 30%, #2C3E50 10%, #1A535C 30%, #A68B5B 60%, #0B3D91 90%)",
      }}
    >
      <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg">
        <img src="/images/books.svg" width={200} alt="Books" className="mb-4" />

        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="email-in" className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email-in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
