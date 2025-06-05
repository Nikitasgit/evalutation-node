"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (request, response, next) => {
    const timestamp = new Date().toISOString();
    const method = request.method;
    const path = request.path;
    const ip = request.ip;
    console.log(`[${timestamp}] ${method} ${path} - IP: ${ip}`);
    next();
};
exports.requestLogger = requestLogger;
