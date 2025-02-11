const { createBook, getAllBooks, getBookById} = require('../controllers/bookController');
const express = require('express');

const router = express.Router();

router.post('/create_book', createBook);
router.post('/get_all_books', getAllBooks);
router.post('/get_book_by_id', getBookById);

module.exports = router;