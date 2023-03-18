'use strict';

module.exports = class ValidationError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'ValidationError';
        this.code = code;
    }

    json() {
        return {
            status: 'fail',
            message: this.message,
        };
    }
}
