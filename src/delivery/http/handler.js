'use strict';
const handler = require('./index.js');

module.exports = (bookService) => {
    return [
        {
            method: 'POST',
            path: '/books',
            handler: handler.createBook(bookService),
        },
        {
            method: 'GET',
            path: '/books',
            handler: handler.getBooks(bookService),
        },
        {
            method: 'GET',
            path: '/books/{id}',
            handler: handler.getBook(bookService),
        },
        {
            method: 'PATCH',
            path: '/books/{id}',
            handler: handler.updateBook(bookService),
        },
        {
            method: 'DELETE',
            path: '/books/{id}',
            handler: handler.deleteBook(bookService),
        },
    ];
};
