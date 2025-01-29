"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRotues = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const router = (0, express_1.Router)();
router.post('/register', auth_controllers_1.authControllers.registerUser);
exports.authRotues = router;
