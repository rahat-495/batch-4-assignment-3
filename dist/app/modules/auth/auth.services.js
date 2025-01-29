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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const user_model_1 = require("../user/user.model");
const registerUserIntoDb = (paylaod) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAlreadyAxist = yield user_model_1.usersModel.findOne({ email: paylaod.email });
    if (isUserAlreadyAxist) {
        throw new Error("This user is already exist !");
    }
    const user = yield user_model_1.usersModel.create(paylaod);
    if (user) {
        const result = { _id: user === null || user === void 0 ? void 0 : user._id, name: user === null || user === void 0 ? void 0 : user.name, email: user === null || user === void 0 ? void 0 : user.email };
        return result;
    }
});
exports.authServices = {
    registerUserIntoDb,
};
