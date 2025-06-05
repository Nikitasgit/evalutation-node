"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (request, response, next) => {
    console.log(`[${request.method}] - ${request.path}`);
    next();
};
exports.requestLogger = requestLogger;
