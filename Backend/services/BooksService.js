const { getBooksFromCSV, getBooksFromJSON } = require('./BooksDataExtractService');

const mergeBooks = (csvBooks, jsonBooks) => {
    const mergedBooks = csvBooks.map((csvBook) => {
        const matchingJsonBook = jsonBooks.find(
            (jsonBook) => jsonBook.id.toString() === csvBook.id.toString()
        );

        if (matchingJsonBook) {
            return {
                id: csvBook.id,
                title: csvBook.title,
                author: csvBook.author,
                rating: csvBook.rating,
                genre: matchingJsonBook.genre,
            };
        }
        return null;
    });

    return mergedBooks.filter((book) => book !== null);
};


const getBooks = async () => {
    const csvBooks = await getBooksFromCSV();
    const jsonBooks = await getBooksFromJSON();
    return mergeBooks(csvBooks, jsonBooks);
};

module.exports = {
    getBooks,
};
