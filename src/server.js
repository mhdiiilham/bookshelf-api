'use strict';
const Hapi = require('@hapi/hapi');
const routes = require('./delivery/http/handler.js');
const { DB } = require('./common/db/connection.js');
const BookRepository = require('./repository/book.js');
const BookService = require('./service/Book.js');

const main = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });


    const repository = new BookRepository(DB);
    const service = new BookService(repository);

    server.route(routes(service));
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

main();
