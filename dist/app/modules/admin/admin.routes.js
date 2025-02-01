"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const admin_controllers_1 = require("./admin.controllers");
const router = (0, express_1.Router)();
router.patch('/users/:userId/block', (0, auth_1.default)("admin"), admin_controllers_1.adminControllers.blockUser);
exports.adminRoutes = router;
