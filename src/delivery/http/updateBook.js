'use strict';
const ValidationError = require("../../model/Error");

module.exports = (srv) => {
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
    };
}
