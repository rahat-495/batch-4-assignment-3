"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || "Some thing went wrong !";
    let errorSources = [{ path: "", message: "Some thing went wrong !" }];
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: err,
        stack: err.stack,
    });
};
exports.default = globalErrorHandler;
