"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const productService_1 = __importDefault(require("./productService"));
const productMiddleware_1 = __importDefault(require("../../core/middlewares/productMiddleware"));
const userMiddleware_1 = __importDefault(require("../../core/middlewares/userMiddleware"));
const authMiddleware_1 = __importDefault(require("../../core/middlewares/authMiddleware"));
const enums_1 = require("../../core/types/enums");
const productRoutes = (router) => {
    router.post("/product", authMiddleware_1.default.jwtAuthentication, userMiddleware_1.default.validateSignedRole(enums_1.UserRoles.Seller), productMiddleware_1.default.validateProduct, productService_1.default.add);
    router.put("/product/:id", authMiddleware_1.default.jwtAuthentication, productMiddleware_1.default.validateProduct, productMiddleware_1.default.existByIdParam, productMiddleware_1.default.userOwnsProduct, productService_1.default.update);
    router.delete("/product/:id", authMiddleware_1.default.jwtAuthentication, productMiddleware_1.default.existByIdParam, productMiddleware_1.default.userOwnsProduct, productService_1.default.deleteProduct);
    router.get("/product/:id", authMiddleware_1.default.jwtAuthentication, productMiddleware_1.default.existByIdParam, productService_1.default.get);
    router.get("/products", authMiddleware_1.default.jwtAuthentication, productMiddleware_1.default.validateSearch, productService_1.default.getCollection);
};
exports.productRoutes = productRoutes;
//# sourceMappingURL=productController.js.map