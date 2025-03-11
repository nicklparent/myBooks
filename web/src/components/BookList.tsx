import React , { useState, useEffect }from 'react';
import { Book, GetAllBooks } from '../api/BookController';

export default function BookList(){
    const [books, setBooks] = useState<Book[]>([]);
    
    
    useEffect(() => {
        async function fetchBooks(){
            const data = await GetAllBooks();
            setBooks(data);
        }    

        fetchBooks();
    }, []);

    return(
        <div>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
}