import { Preferences } from "../assets/types";
const backendHost = import.meta.env.VITE_BACKEND_HOST;

preferenceToString: String = () => {
    return "";
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

export async function setPreference(id: number){
    const prefernce: Preferences = await getUserPreferences(id);
    if (!localStorage.getItem("userPreferences")){
        localStorage.setItem("userPreferences", );
    }

}