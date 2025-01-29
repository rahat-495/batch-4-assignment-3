"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || "Some thing went wrong !";
    let errorSources = [{ path: "", message: "Some thing went wrong !" }];
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: config_1.default.nodeEnv === "development" ? err : null,
        stack: config_1.default.nodeEnv === "development" ? err.stack : null,
    });
};
exports.default = globalErrorHandler;
