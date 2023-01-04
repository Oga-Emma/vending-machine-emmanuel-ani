import { Router } from "express";
import productController from "./productService";
import productMiddleware from "../../core/middlewares/productMiddleware";
import userMiddleware from "../../core/middlewares/userMiddleware";
import sessionMiddleware from "../../core/middlewares/authMiddleware";
import { UserRoles } from "../../core/types/enums";

const productRoutes = (router: Router) => {
    router.post(
        "/product",
        sessionMiddleware.jwtAuthentication,
        userMiddleware.validateSignedRole(UserRoles.Seller),
        productMiddleware.validateProduct,
        productController.add
    );

    router.put(
        "/product/:id",
        sessionMiddleware.jwtAuthentication,
        productMiddleware.validateProduct,
        productMiddleware.existByIdParam,
        productMiddleware.userOwnsProduct,
        productController.update
    );

    router.delete(
        "/product/:id",
        sessionMiddleware.jwtAuthentication,
        productMiddleware.existByIdParam,
        productMiddleware.userOwnsProduct,
        productController.deleteProduct
    );

    router.get(
        "/product/:id",
        sessionMiddleware.jwtAuthentication,
        productMiddleware.existByIdParam,
        productController.get
    );

    router.get(
        "/products",
        sessionMiddleware.jwtAuthentication,
        productMiddleware.validateSearch,
        productController.getCollection
    );
};

export { productRoutes };
