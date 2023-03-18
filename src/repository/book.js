'use strict';
const Book = require('../model/Book.js');

module.exports = class BookRepository {
    constructor(db) {
        this.db = db;
    }

    async store(id, name, year, author, summary, publisher, pageCount, readPage, reading) {
        try {
            const sql = `
                INSERT INTO books (id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `

            const insertedAt = new Date().toISOString();
            const updatedAt = insertedAt;
            await this.db.run(sql, [id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt]);
        } catch (error) {
            throw error;
        }
    }

    getBooks() {
        var that = this;
        return new Promise(function (resolve, reject) {
            const sql = `SELECT id, name, publisher FROM books`
            that.db.all(sql, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    getBook(id) {
        var that = this;
        return new Promise(function (resolve, reject) {
            const sql = `SELECT * FROM books WHERE id = ?;`
            that.db.get(sql, id, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            })
        });
    }

    updateBook(id, updateRequest) {
        var that = this;
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = updateRequest;
        return new Promise(function(resolve, reject) {
            const sql = `
            UPDATE books
            SET
                name = ?,
                year = ?,
                author = ?,
                summary = ?,
                publisher = ?,
                pageCount = ?,
                readPage = ?,
                reading = ?,
                updatedAt = ?
            WHERE id = ?;`

            const updateAt = new Date().toISOString();
            that.db.run(sql, name, year, author, summary, publisher, pageCount, readPage, reading, updateAt, id, (err) => {
                if (err) reject(err);
                resolve();
            })
        });
    }

    deleteBook(id) {
        var that = this;
        return new Promise(function(resolve, reject) {
            const sql = `DELETE FROM books WHERE id = ?;`;
            that.db.run(sql, id, (err) => {
                if (err) reject(err);
                resolve();
            })
        });
    }
};
