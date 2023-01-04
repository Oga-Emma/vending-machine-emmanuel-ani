import { Router } from "express";
import userController, {createAccount} from "./userService";
import userMiddleware from "../../core/middlewares/userMiddleware";
import sessionMiddleware from "../../core/middlewares/authMiddleware";
import { UserRoles } from "../../core/types/enums";

const userRoutes = (router: Router) => {
    router.post(
        "/user",
        userMiddleware.validateCreateNewUser,
        userMiddleware.validateUserRole(UserRoles.Buyer, UserRoles.Seller),
        userMiddleware.emailDoesntExist,
        userController.createAccount
    );

    router.put(
        "/user",
        sessionMiddleware.jwtAuthentication,
        userMiddleware.validateUpdateUser,
        userController.update
    );

    router.delete(
        "/user",
        sessionMiddleware.jwtAuthentication,
        userController.deleteUser
    );

    router.post(
        "/admin",
        userMiddleware.validateCreateNewUser,
        userMiddleware.validateUserRole(UserRoles.Admin),
        userMiddleware.emailDoesntExist,
        userController.createAccount
    );
};

export { userRoutes };
