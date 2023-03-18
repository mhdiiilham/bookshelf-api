'use strict';
const ValidationError = require('../model/Error.js');

module.exports = class BookService {
    constructor(repository) {
        this.bookRepository = repository;
    }


    async createBook(id, name, year, author, summary, publisher, pageCount, readPage, reading) {
        try {
            await this.bookRepository.store(id, name, year, author, summary, publisher, pageCount, readPage, reading);
        } catch (error) {
            throw error;
        }
    }

    async getBooks() {
        try {
            const rows = await this.bookRepository.getBooks();
            if (rows.length < 1) {
                return [];
            }
            return rows;
        } catch (error) {
            throw error
        }
    }

    async getBook(id) {
        try {
            const book = await this.bookRepository.getBook(id);
            if (!book) {
                throw new ValidationError('Buku tidak ditemukan', 404);
            }

            book['finished'] = book.pageCount === book.readPage;
            book['reading'] = book.reading === 1 ? true : false;
            return book;
        } catch (error) {
            throw error;
        }
    }

    async updateBook(id, updateRequest) {
        try {
            const isExist = await this.bookRepository.getBook(id);
            if (!isExist) {
                throw new ValidationError(`Buku tidak ditemukan.`, 404);
            }

            const { name, pageCount, readPage } = updateRequest;
            if (!name) {
                throw new ValidationError('Mohon isi nama buku', 400);
            }

            if (readPage > pageCount) {
                throw new ValidationError('readPage tidak boleh lebih besar dari pageCount', 400);
            }

            this.bookRepository.updateBook(id, updateRequest);
        } catch (error) {
            throw error;
        }
    }

    async deleteBook(id) {
        try {
            const isExist = await this.bookRepository.getBook(id);
            if (!isExist) {
                throw new ValidationError(`Id tidak ditemukan.`, 404);
            }

            await this.bookRepository.deleteBook(id);
        } catch (error) {
            throw error;
        }
    }
}
