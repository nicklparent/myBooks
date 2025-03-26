import React, { useState, useEffect } from 'react';
import { Loading } from '../assets/loading';
import { Preferences, User } from '../assets/types';
import { currentUser } from '../api/UserController';
import { getUserPreferences } from '../api/PrefernceController';

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [preferences, setPreferences] = useState<Preferences | null>(null);
    const [user, setUser] = useState<User>();

    async function fetchData() {
        const userData = await currentUser();
                
        if (userData){
            setUser(userData);
            const preferences = await getUserPreferences(userData.id);
            setPreferences(preferences);
        }
    }

    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, [])
    if (isLoading){
        return <Loading />
    }
    return (
        <div>
          <div>
            Hello {user?.firstName || "guest"}
          </div>
        </div>
    );
}
