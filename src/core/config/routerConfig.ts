import { Router } from "express";
import { userRoutes } from "../../modules/user/userController";
import { authRoutes } from "../../modules/auth/authController";
import { productRoutes } from "../../modules/products/productController";
import { purchaseRoutes } from "../../modules/purchase/purchaseController";

export default class RouterConfig {
    router: Router;

    constructor() {
        this.router = Router({ mergeParams: true });

        this.router.get("/", (req, res) => {
            res.status(200).send("API is running");
        });

        userRoutes(this.router);
        authRoutes(this.router);
        productRoutes(this.router);
        purchaseRoutes(this.router);
    }
}
