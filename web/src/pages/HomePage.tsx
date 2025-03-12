import React , { useState, useEffect } from 'react';
import { Loading } from '../assets/loading';
import { Book, GetAllBooks } from '../api/BookController';

export default function HomePage(){

    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    
    useEffect(() => {

    }, [])
    return(
        <div>
            <p>HomePage</p>
        </div>
    );
}