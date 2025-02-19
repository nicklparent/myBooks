import React, { useEffect, useState } from 'react';
import { Loading } from '../assets/extras/loading';

export function HomePage(){
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let intervalId;

        const fetchBooks = () => {
            fetch(`http://localhost:5053/book`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Fetch failed');
                    }
                    return response.json();
                })
                .then(data => {
                    setBooks(data);
                    setLoading(false);
                    clearInterval(intervalId);
                })
                .catch(error => {
                    console.error('Fetch error, retrying in 5s:', error);
                });
        };

        fetchBooks();
        intervalId = setInterval(fetchBooks, 5000);

        return () => clearInterval(intervalId);
    }, []);


    if (loading){
        
        return (
            <div className='center'>
                <Loading />
            </div>);
    }

    return(
        <div>
            <ul>
                {books.map((book) => 
                    <li key={book.id}>
                        {book.title} by {book.author}
                    </li>
                )}
            </ul>
        </div>
    );
}