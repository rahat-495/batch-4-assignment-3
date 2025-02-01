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
exports.blogServices = void 0;
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const blog_model_1 = require("./blog.model");
const getAllBlogsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchAbleFields = ['title', 'content'];
    let search = "";
    if (query === null || query === void 0 ? void 0 : query.search) {
        search = query.search;
    }
    let filterId = "";
    if (query === null || query === void 0 ? void 0 : query.filter) {
        filterId = query.filter;
    }
    const queryConditions = {
        $or: searchAbleFields.map((field) => ({
            [field]: { $regex: search, $options: "i" }
        }))
    };
    if (filterId) {
        queryConditions._id = filterId;
    }
    const result = yield blog_model_1.blogsModel.find(queryConditions).populate("author").select("-createdAt -updatedAt -__v");
    return result;
});
const createBlogIntoDb = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAxist = yield user_model_1.usersModel.findOne({ email: token === null || token === void 0 ? void 0 : token.email });
    if (!isUserAxist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    payload.author = isUserAxist === null || isUserAxist === void 0 ? void 0 : isUserAxist._id;
    const blog = yield blog_model_1.blogsModel.create(payload);
    const result = yield blog_model_1.blogsModel.findById(blog === null || blog === void 0 ? void 0 : blog._id).populate("author").select("-createdAt -updatedAt -__v");
    return result;
});
const updateBlogFromDb = (blogId, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAxist = yield user_model_1.usersModel.findOne({ email: token === null || token === void 0 ? void 0 : token.email });
    if (!isUserAxist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const isBlogAxist = yield blog_model_1.blogsModel.findById(blogId);
    if (!isBlogAxist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Blog not found !");
    }
    const result = yield blog_model_1.blogsModel.findByIdAndUpdate(blogId, payload, { new: true }).select("-createdAt -updatedAt -__v").populate("author");
    return result;
});
const deleteBlogFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogAxist = yield blog_model_1.blogsModel.findById(id);
    if (!isBlogAxist) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "Blog not found !");
    }
    const result = yield blog_model_1.blogsModel.findByIdAndDelete(id);
    return result;
});
exports.blogServices = {
    createBlogIntoDb,
    updateBlogFromDb,
    deleteBlogFromDb,
    getAllBlogsFromDb,
};
