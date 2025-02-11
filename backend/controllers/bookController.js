const Book = require('../models/book');

const createBook = async(req, res) => {
    const { id, name, author, genre, rating } = req.params;
    try {
        const insertId = Book.create(id, name, author, genre, rating);
        res.status(200).send({message: 'Book added to library', insertId: insertId})
    } catch(e){
        res.status(500).send({message: 'Failed to add book to library'});
    }
}
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.status(200).json(books);
    } catch(e){
        res.status(500).json({message: 'Error fetching all books: ', e});
    }
} 

const getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.getBookById(id);
        res.status(200).json(book)
    } catch(e){
        res.status(500).send({message: 'Error fetching book by id ', e})
    }
}

module.exports = {createBook, getAllBooks, getBookById};