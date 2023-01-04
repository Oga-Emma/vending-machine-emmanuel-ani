"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const userMiddleware_1 = __importDefault(require("../../core/middlewares/userMiddleware"));
const authService_1 = __importDefault(require("./authService"));
const authMiddleware_1 = __importDefault(require("../../core/middlewares/authMiddleware"));
const authRoutes = (router) => {
    router.post("/token", userMiddleware_1.default.authenticate, authMiddleware_1.default.countActiveSessions, authService_1.default.generateJWT);
    router.delete("/token", authMiddleware_1.default.jwtAuthentication, authService_1.default.deleteSession);
    router.delete("/all-tokens", authMiddleware_1.default.jwtAuthentication, authService_1.default.deleteAllSessions);
};
exports.authRoutes = authRoutes;
//# sourceMappingURL=authController.js.map