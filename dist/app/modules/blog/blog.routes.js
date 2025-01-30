"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const blog_controllers_1 = require("./blog.controllers");
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)("user"), (0, validateRequest_1.default)(blog_validation_1.blogValidations.createBlogValidationSchema), blog_controllers_1.blogControllers.createBlog);
router.patch('/:id', (0, auth_1.default)("user"), (0, validateRequest_1.default)(blog_validation_1.blogValidations.updateBlogValidationSchema), blog_controllers_1.blogControllers.updateBlog);
exports.blogRoutes = router;
