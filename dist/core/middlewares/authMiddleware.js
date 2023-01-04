"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countActiveSessions = exports.jwtAuthentication = void 0;
const user_1 = require("../models/user");
const session_1 = require("../models/session");
const jwtAuthentication = (req, res, next) => {
    console.log("middlewares.auth.jwtAuthentication");
    if (!req.headers.authorization)
        return next("Missing token header");
    session_1.Session.findOne({
        where: {
            jwt: req.headers.authorization,
        },
        include: {
            model: user_1.User,
        },
    })
        .then((session) => {
        if (session == null)
            return next("Invalid authorization token");
        req.user = session.User;
        req.session = session;
        next();
    })
        .catch((err) => res.json(err));
};
exports.jwtAuthentication = jwtAuthentication;
const countActiveSessions = (req, res, next) => {
    if (!req.user)
        return next("User is not set in request");
    session_1.Session.findAndCountAll({
        where: {
            UserId: req.user.id,
        },
        offset: 0,
        limit: 0,
    }).then((result) => {
        req.sessionCount = result.count;
        next();
    });
};
exports.countActiveSessions = countActiveSessions;
exports.default = {
    jwtAuthentication: exports.jwtAuthentication,
    countActiveSessions: exports.countActiveSessions,
};
//# sourceMappingURL=authMiddleware.js.map