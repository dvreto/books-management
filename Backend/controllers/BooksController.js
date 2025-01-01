const express = require('express');
const { getBooks } = require('../services/BooksService');

const router = express.Router();

router.get('/books', async (req, res) => {
    try {
        const books = await getBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

module.exports = router;
