import { User, ApiError } from "../assets/types";

const backendHost = import.meta.env.VITE_BACKEND_HOST;

export async function getUser(id: number): Promise<User | ApiError>{
    try {
      const response = await fetch(`${backendHost}/user/${id}`);

      if (!response.ok){
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const data = await response.json();
      console.log();
      
      const user: User = {
        id: data.id,
        email: data.email,
        password: "",
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        username: data.username ?? "",
      }
      return user;
    } catch (error) {
      return {
        message: "could not find user",
        error: error instanceof Error ? error.message : "unknown error", 
      }
    }
}

export function isLoggedIn(): boolean{
  const token = localStorage.getItem("authToken");
  return token ? true : false;
}


// Handle the main login processes of the site
export async function loginWithEmailAndPassword(email: string, password: string): Promise<User | ApiError>{
  try{
    if (email.trim() == "" || !email.trim()){
      return {
        message: "email not valid",
        error: "email field must be filled" 
      }
    }

    if (password == "" || !password){
      return {
        message: "password not valid",
        error: "password field must be filled"
      }
    }
    
    const response = await fetch(`${backendHost}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: email, password: password})
    });

    if (!response.ok){
      return {
        message: "could not find user",
        error: "Error finding user information"
      }
    }

    const data = await response.json();

    localStorage.setItem('authToken', data.token);

    const user: User = {
      id: data.id,
      email: data.email,
      password: data.password,
      username: data.username ?? "",
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? ""
    }

    return user;
    
  } catch (error){
    return {
      message: "Authentication failed",
      error: error instanceof Error ? error.message : ""
    }
  }
}