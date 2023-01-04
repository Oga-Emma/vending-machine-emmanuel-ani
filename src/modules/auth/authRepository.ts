import {Request, Response, NextFunction} from "express";
import {Session, ISession} from "../../core/models/session";

class AuthRepository {
    generateJWT(
        userId: number
    ) {
        return Session.create({
            UserId: userId,
            jwt: "",
        })
    }

    deleteSession(
        sessionId: number
    ) {
        return Session.destroy({
            where: {
                id: sessionId,
            },
        })
    };

    deleteAllSessions(
        userId: number
    ) {
        return Session.destroy({
            where: {
                UserId: userId,
            },
        })
    };
}

let authRepository = new AuthRepository();
export default authRepository
