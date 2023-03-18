'use strict';
const Book = require('../../model/Book.js');
const ValidationError = require('../../model/Error.js');


module.exports = (srv) => {
    return async (request, h) => {
        try {
            const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
            const book = new Book(name, year, author, summary, publisher, pageCount, readPage, reading);
            book.validate();

            await srv.createBook(book.id, name, year, author, summary, publisher, pageCount, readPage, reading);
            return h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: book.id,
                },
            }).code(201);

        } catch (error) {
            if (error instanceof ValidationError) {
                return h.response({
                    status: 'fail',
                    message: `Gagal menambahkan buku. ${error.message}`,
                }).code(error.code);
            }
            
            return h.response({
                status: 'fail',
                message: error.message
            }).code(500);
        }
    };
}
