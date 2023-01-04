"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const userService_1 = __importDefault(require("./userService"));
const userMiddleware_1 = __importDefault(require("../../core/middlewares/userMiddleware"));
const authMiddleware_1 = __importDefault(require("../../core/middlewares/authMiddleware"));
const enums_1 = require("../../core/types/enums");
const userRoutes = (router) => {
    router.post("/user", userMiddleware_1.default.validateCreateNewUser, userMiddleware_1.default.validateUserRole(enums_1.UserRoles.Buyer, enums_1.UserRoles.Seller), userMiddleware_1.default.emailDoesntExist, userService_1.default.createAccount);
    router.put("/user", authMiddleware_1.default.jwtAuthentication, userMiddleware_1.default.validateUpdateUser, userService_1.default.update);
    router.delete("/user", authMiddleware_1.default.jwtAuthentication, userService_1.default.deleteUser);
    router.post("/admin", userMiddleware_1.default.validateCreateNewUser, userMiddleware_1.default.validateUserRole(enums_1.UserRoles.Admin), userMiddleware_1.default.emailDoesntExist, userService_1.default.createAccount);
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=userController.js.map