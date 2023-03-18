'use strict';
const BookService = require('../../service/Book.js');
const { DB } = require('../../common/db/connection.js');
const BookRepository = require('../../repository/book.js');
const bookRepository = new BookRepository(DB);
const bookService = new BookService(bookRepository);
const Book = require('../../model/Book.js');
const ValidationError = require('../../model/Error.js');

const rootHandler = (srv) => {
    return (request, h) => {
        return h.response({message: 'Bookshelf API'}).code(200);
    };
};

const createBook = (srv) => {
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
};

const getBooks = (srv) => {
    return async (request, h) => {
        try {
            const rows = await srv.getBooks();
            return h.response({
                status: 'success',
                data: rows,
            }).code(200);

        } catch (error) {
            if (error instanceof ValidationError) {
                return h.response(error.json()).code(error.code);
            }
            
            return h.response({
                status: 'fail',
                message: error.message
            }).code(500);
        }
    };
}

const getBook = (srv) => {
    return async (request, h) => {
        try {
            const id = request.params.id;
            const book = await srv.getBook(id);
            return h.response({
                status: 'success',
                data: {
                    book: book,
                },
            }).code(200);
        } catch (error) {
            if (error instanceof ValidationError) {
                return h.response(error.json()).code(error.code);
            }
            
            return h.response({
                status: 'fail',
                message: error.message
            }).code(500);
        }
    }
}

const updateBook = (srv) => {
    return async (request, h) => {
        try {
            const id = request.params.id;
            await srv.updateBook(id, request.payload);
            return h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            }).code(200);
        } catch (error) {
            if (error instanceof ValidationError) {
                return h.response({
                    status: 'fail',
                    message: `Gagal memperbarui buku. ${error.message}`
                }).code(error.code);
            }
            
            return h.response({
                status: 'fail',
                message: error.message
            }).code(500);
        }
    }
}

const deleteBook = (srv) => {
    return async (request, h) => {
        try {
            const id = request.params.id;
            await srv.deleteBook(id);
            return h.response({
                status: 'success',
                message: 'Buku berhasil dihapus',
            }).code(200);
        } catch (error) {
            if (error instanceof ValidationError) {
                return h.response({
                    status: 'fail',
                    message: `Buku gagal dihapus. ${error.message}`
                }).code(error.code);
            }
            
            return h.response({
                status: 'fail',
                message: error.message
            }).code(500);
        }
    }
}

const routes = [
    {
        method: 'GET',
        path: '/api/v1',
        handler: rootHandler(bookService),
    },
    {
        method: 'POST',
        path: '/books',
        handler: createBook(bookService),
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooks(bookService),
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBook(bookService),
    },
    {
        method: 'PATCH',
        path: '/books/{id}',
        handler: updateBook(bookService),
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook(bookService),
    },
]

module.exports = { routes };
