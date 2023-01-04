import { Request, Response, NextFunction } from "express";
import { IUser, validatePassword, salt } from "../../core/models/user";
import userRepo from "./userRepository";
import bcrypt from "bcrypt";

export const readAll = (req: Request, res: Response) => {
    userRepo.findAllUsers()
        .then((users: IUser[]) => {
            res.json(users);
        })
        .catch((err: any) => {
            res.json(err);
        });
};

export const logIn = (req: Request, res: Response, next: NextFunction) => {
    userRepo.findUserByEmail(req.body.email)
        .then((user: IUser | null) => {
            if (user == null) {
                return res.status(403).send("Email or password do not match!");
            }
            if (validatePassword(req.body.password, user.password)) {
                res.status(200).send("Successful log in!");
            } else {
                res.status(403).send("Email or password do not match!");
            }
        })
        .catch(() => {
            res.status(403).send("Email or password do not match!");
        });
};

export const createAccount = (req: Request, res: Response) => {


    userRepo.saveUser({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        balance: 0,
    })
        .then((user: IUser) => {
            res.json({
                email: req.body.email,
                role: req.body.role,
            });
        })
        .catch((err: any) => {
            res.json(err);
        });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next("User is not set in request");
    const cryptedPassword = bcrypt.hashSync(req.body.password, salt);
    userRepo.updateUser(
        { password: cryptedPassword },
        {
            fields: ["password"],
            where: {
                id: req.user.id,
            },
        }
    )
        .then(() => {
            res.status(200).send({});
        })
        .catch((err: any) => next(err));
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next("User is not set in request");
    userRepo.deleteUser({
        where: {
            id: req.user.id,
        },
    })
        .then(() => {
            res.status(200).send("User deleted successfully");
        })
        .catch((err: any) => next(err));
};

export default {
    logIn,
    createAccount,
    readAll,
    update,
    deleteUser,
};
