'use strict';
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbFile = path.resolve(__dirname + 'bookshelf.db');

const DB = new sqlite3.Database(dbFile, (err) => {
    if (err) throw err;
})

DB
    .exec(`
    CREATE TABLE IF NOT EXISTS books (
        id VARCHAR PRIMARY KEY NOT NULL,
        name VARCHAR NOT NULL,
        year DATETIME,
        author VARCHAR,
        summary VARCHAR,
        publisher VARCHAR,
        pageCount NUMBER,
        readPage NUMBER,
        reading BOOLEAN,
        insertedAt DATETIME,
        updatedAt DATETIME
    );`, (err) => {
        if (err) throw err;
    });

module.exports = { DB }
