import { Router } from "express";
import productMiddleware from "../../core/middlewares/productMiddleware";
import userMiddleware from "../../core/middlewares/userMiddleware";
import sessionMiddleware from "../../core/middlewares/authMiddleware";
import purchaseMiddleware from "../../core/middlewares/purchaseMiddleware";
import purchaseService from "./purchaseService";
import { UserRoles } from "../../core/types/enums";

const purchaseRoutes = (router: Router) => {
    router.post(
        "/deposit",
        sessionMiddleware.jwtAuthentication,
        userMiddleware.validateSignedRole(UserRoles.Buyer),
        purchaseMiddleware.validateCoin,
        purchaseMiddleware.validateMaxBalance,
        purchaseService.deposit
    );

    router.post(
        "/reset",
        sessionMiddleware.jwtAuthentication,
        userMiddleware.validateSignedRole(UserRoles.Buyer),
        purchaseService.resetBalance
    );

    router.post(
        "/buy",
        sessionMiddleware.jwtAuthentication,
        userMiddleware.validateSignedRole(UserRoles.Buyer),
        productMiddleware.existByProductIdBody,
        purchaseMiddleware.validatePurchase,
        purchaseService.buy
    );
};

export { purchaseRoutes };
