"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const HandleZodError_1 = __importDefault(require("../../errors/HandleZodError"));
const HandleValidationError_1 = __importDefault(require("../../errors/HandleValidationError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../../errors/handleDuplicateError"));
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || "Some thing went wrong !";
    let errorSources = [{ path: "", message: "Some thing went wrong !" }];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, HandleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, HandleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err instanceof AppErrors_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [{ path: "", message: err.message }];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [{ path: "", message: err.message }];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: err,
        stack: err.stack,
    });
};
exports.default = globalErrorHandler;
