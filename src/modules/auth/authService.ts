import {Request, Response, NextFunction} from "express";
import {Session, ISession} from "../../core/models/session";
import authRepository from "./authRepository";


export const generateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) return next("User is not set in request");
    console.log("generateJWT", `userId=${req.user.id}`);
    authRepository.generateJWT(req.user.id)
        .then((session: ISession) => {
            console.log("created auth", session);
            res.status(200).json({
                token: session.jwt,
                role: req.user?.role || "", // type guard fails
                userId: req.user?.id || 0,
                balance: req.user?.balance || 0,
                sessionCount: req.sessionCount,
            });
        })
        .catch((err: any) => {
            res.json(err);
        });
};

export const deleteSession = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session) return next("Session is not set in request");
    console.log("delete auth ", req.session.id);
    authRepository.deleteSession(req.session.id)
        .then(() => {
            res.status(200).send("Signed out successfully");
        })
        .catch((err: any) => next(err));
};

export const deleteAllSessions = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session) return next("Session is not set in request");
    authRepository.deleteAllSessions(req.session.UserId)
        .then(() => {
            res.status(200).json("Signed out from every auth successfully");
        })
        .catch((err: any) => next(err));
};

export default {
    generateJWT,
    deleteSession,
    deleteAllSessions,
};
