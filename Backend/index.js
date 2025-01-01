const express = require('express');
const cors = require('cors');
const booksController = require('./controllers/BooksController');

const app = express();
const port = 3000;

app.use(cors());

app.use('/api', booksController);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
