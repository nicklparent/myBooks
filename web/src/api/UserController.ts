const backendHost = import.meta.env.VITE_BACKEND_HOST;

type Preferences = {
  theme: string;
  filter: boolean;
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
      throw new Error(`Failed to fetch preferences: ${response.status}`);
    }

    const data: Preferences = await response.json();
    return data;

  } catch (error) {
    return { 
        theme: "dark",
        filter: true 
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
