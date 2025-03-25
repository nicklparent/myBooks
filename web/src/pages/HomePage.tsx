import React, { useState, useEffect } from 'react';
import { Loading } from '../assets/loading';
import { Book, GetAllBooks } from '../api/BookController';
import { Preferences, User } from '../assets/types';
import { jwtDecode } from 'jwt-decode';
import { getUser, getUserPreferences } from '../api/UserController';

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [preferences, setPreferences] = useState<Preferences | null>(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const decodedToken: any = jwtDecode(token);
                    const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
                    const userData = await getUser(userId);
                    setPreferences(await getUserPreferences(userId));
                    if ('error' in userData) {
                        setError(userData.message);
                    } else {
                        setUser(userData);
                    }
                }
                const booksData = await GetAllBooks();
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) return <Loading />;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="home-container">
            <h1>Home Page</h1>
            {user ? <p>Welcome, {user.firstName || user.email}!</p> : <p>Please log in.</p>}
            <h2>Books:</h2>
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>{book.title} by {book.author}</li>
                    ))}
                </ul>
            ) : (
                <p>No books available.</p>
            )}
        </div>
    );
}
