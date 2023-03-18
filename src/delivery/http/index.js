'use stict';
const createBookHandler = require('./createBook.js');
const getBooksHandler = require('./getBooks.js');
const getBookHandler = require('./getBook.js');
const updateBookHandler = require('./updateBook.js')
const deleteBookHandler = require('./deleteBook.js')

module.exports = {
    createBook: createBookHandler,
    getBooks: getBooksHandler,
    getBook: getBookHandler,
    updateBook: updateBookHandler,
    deleteBook: deleteBookHandler,
};
