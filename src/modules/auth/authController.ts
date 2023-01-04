import { Router } from "express";

import userMiddleware from "../../core/middlewares/userMiddleware";
import authController from "./authService";
import sessionMiddleware from "../../core/middlewares/authMiddleware";

const authRoutes = (router: Router) => {
    router.post(
        "/token",
        userMiddleware.authenticate,
        sessionMiddleware.countActiveSessions,
        authController.generateJWT
    );

    router.delete(
        "/token",
        sessionMiddleware.jwtAuthentication,
        authController.deleteSession
    );

    router.delete(
        "/all-tokens",
        sessionMiddleware.jwtAuthentication,
        authController.deleteAllSessions
    );
};

export { authRoutes };
