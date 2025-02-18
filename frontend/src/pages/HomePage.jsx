import React, { useEffect, useState } from 'react';
import { Loading } from '../assets/extras/loading';

export function HomePage(){
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5053/book`)
        .then(response => {
            if (!response.ok){
                throw new Error('Fetch failed');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            
            setBooks(data);
            setLoading(false)
        })
        .catch(error => console.error('THIS DID NOT WORK'));
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