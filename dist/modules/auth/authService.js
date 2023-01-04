"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllSessions = exports.deleteSession = exports.generateJWT = void 0;
const authRepository_1 = __importDefault(require("./authRepository"));
const generateJWT = (req, res, next) => {
    if (!req.user)
        return next("User is not set in request");
    console.log("generateJWT", `userId=${req.user.id}`);
    authRepository_1.default.generateJWT(req.user.id)
        .then((session) => {
        var _a, _b, _c;
        console.log("created auth", session);
        res.status(200).json({
            token: session.jwt,
            role: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || "",
            userId: ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) || 0,
            balance: ((_c = req.user) === null || _c === void 0 ? void 0 : _c.balance) || 0,
            sessionCount: req.sessionCount,
        });
    })
        .catch((err) => {
        res.json(err);
    });
};
exports.generateJWT = generateJWT;
const deleteSession = (req, res, next) => {
    if (!req.session)
        return next("Session is not set in request");
    console.log("delete auth ", req.session.id);
    authRepository_1.default.deleteSession(req.session.id)
        .then(() => {
        res.status(200).send("Signed out successfully");
    })
        .catch((err) => next(err));
};
exports.deleteSession = deleteSession;
const deleteAllSessions = (req, res, next) => {
    if (!req.session)
        return next("Session is not set in request");
    authRepository_1.default.deleteAllSessions(req.session.UserId)
        .then(() => {
        res.status(200).json("Signed out from every auth successfully");
    })
        .catch((err) => next(err));
};
exports.deleteAllSessions = deleteAllSessions;
exports.default = {
    generateJWT: exports.generateJWT,
    deleteSession: exports.deleteSession,
    deleteAllSessions: exports.deleteAllSessions,
};
//# sourceMappingURL=authService.js.map