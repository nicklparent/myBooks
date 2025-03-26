import { User, ApiError } from "../assets/types";
import { jwtDecode } from "jwt-decode";

const backendHost = import.meta.env.VITE_BACKEND_HOST;

interface DecodedToken {
  [key: string]: string | number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  exp: number;
}

export async function currentUser(): Promise<User | null> {
  const tokenString = localStorage.getItem("authToken");
  if (!tokenString) {
    return null;
  }
 
  try {
    const token = jwtDecode<DecodedToken>(tokenString);   
    // Check token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp < currentTime) {
      localStorage.removeItem("authToken");
      return null;
    }

    // Extract user ID from the nameidentifier claim
    const userId = parseInt(token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
   
    if (userId) {
      const user = await getUser(userId);
      if ("error" in user) {
        return null;
      }
      return user;
    }
  } catch (e) {
    localStorage.removeItem("authToken");
  }
  return null;
}

export async function getUser(id: number): Promise<User | ApiError> {
  try {
    const response = await fetch(`${backendHost}/user/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }
    const data = await response.json();      
    const user: User = {
      id: data.id,
      email: data.email,
      password: "",
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      username: data.username ?? "",
    };
    return user;
  } catch (error) {
    return {
      message: "could not find user",
      error: error instanceof Error ? error.message : "unknown error",
    };
  }
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string
): Promise<User | ApiError> {
  try {
    if (!email.trim()) {
      return {
        message: "email not valid",
        error: "email field must be filled"
      };
    }
    if (!password) {
      return {
        message: "password not valid",
        error: "password field must be filled"
      };
    }
   
    const response = await fetch(`${backendHost}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      return {
        message: "could not find user",
        error: "Error finding user information"
      };
    }
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    const user: User = {
      id: data.id,
      email: data.email,
      password: "",
      username: data.username ?? "",
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? ""
    };
    return user;
   
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: "Authentication failed",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}