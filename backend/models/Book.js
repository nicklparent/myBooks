/**
 * The Book model needs to be combatable with isbn API for future development
 */

const db = require('../config/db');

class Book{
    static async create({isbn_id, name, author,  genre, rating}) {
        const [result] = await db.execute(
            'INSERT INTO books (idbn_id, name, author, genre, rating) VALUES (?, ?, ?, ?, ?)',
            [isbn_id, name, author, genre, rating]
        );
        return result.insertId;
    }
    static async fetchById({id}){
        const [rows] = await db.execute(
            'SELECT * FROM books WHERE isbn_id = ?',
            [id]
        );
        return rows;
    }

    static async fetchByName({name}){
        const [rows] = await db.execute(
            'SELECT * FROM books WHERE name = ?',
            [name]
        );
        return rows;
    }

    static async fetchByAuthor({author}){
        const [rows] = await db.execute(
            'SELECT * FROM books WHERE author = ?',
            [author]
        );
        return rows;
    }

    static async fetchByGenre({genre}){
        const [rows] = await db.execute(
            'SELECT * FROM books WHERE genre = ?',
            [genre]
        );
        return rows;
    }

    static async fetchByRating({rating}){
        const [rows] = await db.execute(
            'SELECT * FROM books WHERE rating = ?',
            [rating]
        );
        return rows;
    }

    static async getAllBooks(){
        const [rows] = await db.execute(
            'SELECT * FROM books'
        );
        return rows;
    }
}

module.exports = Book;