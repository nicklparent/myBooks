import { Preferences, User, ApiError } from "../assets/types";

const backendHost = import.meta.env.VITE_BACKEND_HOST;

export async function getUserPreferences(id: number): Promise<Preferences> {
  try {
    const response = await fetch(`${backendHost}/user/get-user-preference/${id}`);
    
    if (!response.ok) {
      console.error(`Faied to fetch preferences: ${response.status}`);
      
      throw new Error(`Failed to fetch preferences: ${response.status}`);
    }

    const data = await response.json();
    const userPreference: Preferences = {
      theme: data.theme ?? "dark",
      contentFilter: data.contentFilter ?? true,
    };
    
    return userPreference;

  } catch (error) {
    return { 
      theme: "dark",
      contentFilter: true 
    };
  }
}

export async function getUser(id: number): Promise<User | ApiError>{
    try {
      const response = await fetch(`${backendHost}/user/${id}`);

      if (!response.ok){
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const data: User = await response.json();
      return data;
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

export async function getUserWithEmailAndPassword(email: string, password: string): Promise<User | ApiError>{
  try{
    // TODO
    //create a validator class that will check for invalud input as well
    if (email == "" || !email){
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
    const response = await fetch(`${backendHost}/user/get-by-email-password/${email}/${password}`);

    if (!response.ok){
      return {
        message: "could not connect to backend",
        error: String(response.status),
      }
    }

    const data = await response.json();
    return data;  
    
  } catch (error){
    return {
      message: "could not find user",
      error: error instanceof Error ? error.message : ""
    }
  }

  
}