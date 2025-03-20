const backendHost = import.meta.env.VITE_BACKEND_HOST;

type Preferences = {
  theme: string;
  contentFilter: boolean;
}

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

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

export async function getUser(id: number): Promise<User | {message: string, error: string}>{
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

  if (token){
    return true;
  }
  return false;
}