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
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserIntoDb = (paylaod) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAlreadyAxist = yield user_model_1.usersModel.findOne({ email: paylaod.email });
    if (isUserAlreadyAxist) {
        throw new AppErrors_1.default(500, "This user is already exist !");
    }
    const user = yield user_model_1.usersModel.create(paylaod);
    if (user) {
        const result = { _id: user === null || user === void 0 ? void 0 : user._id, name: user === null || user === void 0 ? void 0 : user.name, email: user === null || user === void 0 ? void 0 : user.email };
        return result;
    }
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAxist = yield user_model_1.usersModel.findOne({ email: payload.email });
    if (!isUserAxist) {
        throw new AppErrors_1.default(404, "User not found !");
    }
    const isBlocked = isUserAxist === null || isUserAxist === void 0 ? void 0 : isUserAxist.isBlocked;
    if (isBlocked) {
        throw new AppErrors_1.default(403, "User is blocked !");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, isUserAxist === null || isUserAxist === void 0 ? void 0 : isUserAxist.password);
    if (!isPasswordMatched) {
        throw new AppErrors_1.default(401, "Password is not matched !");
    }
    const jwtPayload = { email: isUserAxist === null || isUserAxist === void 0 ? void 0 : isUserAxist.email, role: isUserAxist === null || isUserAxist === void 0 ? void 0 : isUserAxist.role };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwtAccessSecret, { expiresIn: "365d" });
    return { token };
});
exports.authServices = {
    loginUser,
    registerUserIntoDb,
};
