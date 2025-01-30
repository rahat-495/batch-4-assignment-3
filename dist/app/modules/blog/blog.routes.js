"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const blog_controllers_1 = require("./blog.controllers");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)("user"), blog_controllers_1.blogControllers.createBlog);
exports.blogRoutes = router;
