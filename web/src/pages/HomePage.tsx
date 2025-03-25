import React, { useState, useEffect } from 'react';
import { Loading } from '../assets/loading';
import { Book, GetAllBooks } from '../api/BookController';
import { User } from '../assets/types';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../api/UserController';

export default function HomePage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('authToken'); 
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);
                
                const user = getUser(decodedToken.id)
                setUser(user);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('authToken'); // Remove invalid token
            }
        }

        GetAllBooks()
            .then((data) => {
                setBooks(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <h1>HomePage</h1>
            {user ? <p>Welcome, {user.email}!</p> : <p>Please log in.</p>}
            <h2>Books:</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>{book.title} by {book.author}</li>
                ))}
            </ul>
        </div>
    );
}
