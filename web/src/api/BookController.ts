const backendHost = import.meta.env.VITE_BACKEND_HOST;


export interface Book{
    id: number;
    title: string;
    author: string;
    genre: string;
    pageCount: number;
    description: string;
    coverImageUrl: string;
}

export async function GetAllBooks(): Promise<Book[]>{
    try{
        const response = await fetch(`${backendHost}/book`);

        if (!response.ok){
            throw new Error("Could not fetch books");
        }

        const books: Book[] = await response.json();
        return books;
    } catch (e){
        
        return [];
    }
}