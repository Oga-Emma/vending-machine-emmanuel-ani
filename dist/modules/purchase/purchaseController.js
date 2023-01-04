"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseRoutes = void 0;
const productMiddleware_1 = __importDefault(require("../../core/middlewares/productMiddleware"));
const userMiddleware_1 = __importDefault(require("../../core/middlewares/userMiddleware"));
const authMiddleware_1 = __importDefault(require("../../core/middlewares/authMiddleware"));
const purchaseMiddleware_1 = __importDefault(require("../../core/middlewares/purchaseMiddleware"));
const purchaseService_1 = __importDefault(require("./purchaseService"));
const enums_1 = require("../../core/types/enums");
const purchaseRoutes = (router) => {
    router.post("/deposit", authMiddleware_1.default.jwtAuthentication, userMiddleware_1.default.validateSignedRole(enums_1.UserRoles.Buyer), purchaseMiddleware_1.default.validateCoin, purchaseMiddleware_1.default.validateMaxBalance, purchaseService_1.default.deposit);
    router.post("/reset", authMiddleware_1.default.jwtAuthentication, userMiddleware_1.default.validateSignedRole(enums_1.UserRoles.Buyer), purchaseService_1.default.resetBalance);
    router.post("/buy", authMiddleware_1.default.jwtAuthentication, userMiddleware_1.default.validateSignedRole(enums_1.UserRoles.Buyer), productMiddleware_1.default.existByProductIdBody, purchaseMiddleware_1.default.validatePurchase, purchaseService_1.default.buy);
};
exports.purchaseRoutes = purchaseRoutes;
//# sourceMappingURL=purchaseController.js.map