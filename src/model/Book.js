'use strict';
const { v4: uuidv4 } = require('uuid');
const ValidationError = require('./Error');

module.exports = class Book {
    constructor(name, year, author, summary, publisher, pageCount, readPage, reading) {
        this.id = uuidv4();
        this.name = name;
        this.year = year;
        this.author = author;
        this.summary = summary;
        this.publisher = publisher;
        this.pageCount = pageCount;
        this.readPage = readPage;
        this.reading = reading;
        this.isFinished = false;
        this.insertedAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    validate() {
        if (!this.name) {
            throw new ValidationError('Mohon isi nama buku', 400);
        }

        if (this.readPage > this.pageCount) {
            throw new ValidationError('readPage tidak boleh lebih besar dari pageCount', 400);
        }
    }
}
