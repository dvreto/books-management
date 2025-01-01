const fs = require('fs');
const csvParser = require('csv-parser');

const getBooksFromCSV = async () => {
    const books = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream('./data/books.csv')
            .pipe(csvParser())
            .on('data', (row) => {
                books.push(row);
            })
            .on('end', () => {
                resolve(books);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

const getBooksFromJSON = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/books.json', 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
};

module.exports = {
    getBooksFromCSV,
    getBooksFromJSON,
};
