"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
const APIResponse = (response, data, message, status = 200) => {
    response.status(status).json({
        message,
        data,
    });
};
exports.APIResponse = APIResponse;
