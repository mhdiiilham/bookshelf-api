'use strict';
const ValidationError = require('../../model/Error.js');

module.exports = (srv) => {
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