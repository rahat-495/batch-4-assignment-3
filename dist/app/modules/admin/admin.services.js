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
exports.adminServices = void 0;
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const blog_model_1 = require("../blog/blog.model");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const blockUserIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAxist = yield user_model_1.usersModel.findById(id);
    if (!isUserAxist) {
        throw new AppErrors_1.default(404, "User Not Fount !");
    }
    if ((isUserAxist === null || isUserAxist === void 0 ? void 0 : isUserAxist.role) === "admin") {
        throw new AppErrors_1.default(http_status_1.default.UNAUTHORIZED, "You can't block a admin !");
    }
    const result = yield user_model_1.usersModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    return result;
});
const deleteblogIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogAxist = yield blog_model_1.blogsModel.findById(id);
    if (!isBlogAxist) {
        throw new AppErrors_1.default(404, "Blog Not Fount !");
    }
    const result = yield blog_model_1.blogsModel.findByIdAndDelete(id);
    return result;
});
exports.adminServices = {
    blockUserIntoDb,
    deleteblogIntoDb,
};
