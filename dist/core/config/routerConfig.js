"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../modules/user/userController");
const authController_1 = require("../../modules/auth/authController");
const productController_1 = require("../../modules/products/productController");
const purchaseController_1 = require("../../modules/purchase/purchaseController");
class RouterConfig {
    constructor() {
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.router.get("/", (req, res) => {
            res.status(200).send("API is running");
        });
        (0, userController_1.userRoutes)(this.router);
        (0, authController_1.authRoutes)(this.router);
        (0, productController_1.productRoutes)(this.router);
        (0, purchaseController_1.purchaseRoutes)(this.router);
    }
}
exports.default = RouterConfig;
//# sourceMappingURL=routerConfig.js.map