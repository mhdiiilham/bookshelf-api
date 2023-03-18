'use strict';
const ValidationError = require('../../model/Error.js');

module.exports = (srv) => {
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
