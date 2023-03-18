'use strict';
const Hapi = require('@hapi/hapi');
const { routes } = require('./delivery/http/handler.js');

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


    server.route(routes);
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

main();
