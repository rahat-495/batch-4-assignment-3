"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_services_1 = require("./blog.services");
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_services_1.blogServices.getAllBlogsFromDb(req.query);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Blogs fetched successfully" });
    }
}));
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_services_1.blogServices.createBlogIntoDb(req.body, req.user);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 201, success: true, message: "Blog created successfully" });
    }
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_services_1.blogServices.updateBlogFromDb(req.params.id, req.body, req.user);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Blog updated successfully" });
    }
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_services_1.blogServices.deleteBlogFromDb(req.params.id, req.user);
    if (result) {
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    }
}));
exports.blogControllers = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
};
