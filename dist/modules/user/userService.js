"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update = exports.createAccount = exports.logIn = exports.readAll = void 0;
const user_1 = require("../../core/models/user");
const userRepository_1 = __importDefault(require("./userRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const readAll = (req, res) => {
    userRepository_1.default.findAllUsers()
        .then((users) => {
        res.json(users);
    })
        .catch((err) => {
        res.json(err);
    });
};
exports.readAll = readAll;
const logIn = (req, res, next) => {
    userRepository_1.default.findUserByEmail(req.body.email)
        .then((user) => {
        if (user == null) {
            return res.status(403).send("Email or password do not match!");
        }
        if ((0, user_1.validatePassword)(req.body.password, user.password)) {
            res.status(200).send("Successful log in!");
        }
        else {
            res.status(403).send("Email or password do not match!");
        }
    })
        .catch(() => {
        res.status(403).send("Email or password do not match!");
    });
};
exports.logIn = logIn;
const createAccount = (req, res) => {
    userRepository_1.default.saveUser({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        balance: 0,
    })
        .then((user) => {
        res.json({
            email: req.body.email,
            role: req.body.role,
        });
    })
        .catch((err) => {
        res.json(err);
    });
};
exports.createAccount = createAccount;
const update = (req, res, next) => {
    if (!req.user)
        return next("User is not set in request");
    const cryptedPassword = bcrypt_1.default.hashSync(req.body.password, user_1.salt);
    userRepository_1.default.updateUser({ password: cryptedPassword }, {
        fields: ["password"],
        where: {
            id: req.user.id,
        },
    })
        .then(() => {
        res.status(200).send({});
    })
        .catch((err) => next(err));
};
exports.update = update;
const deleteUser = (req, res, next) => {
    if (!req.user)
        return next("User is not set in request");
    userRepository_1.default.deleteUser({
        where: {
            id: req.user.id,
        },
    })
        .then(() => {
        res.status(200).send("User deleted successfully");
    })
        .catch((err) => next(err));
};
exports.deleteUser = deleteUser;
exports.default = {
    logIn: exports.logIn,
    createAccount: exports.createAccount,
    readAll: exports.readAll,
    update: exports.update,
    deleteUser: exports.deleteUser,
};
//# sourceMappingURL=userService.js.map