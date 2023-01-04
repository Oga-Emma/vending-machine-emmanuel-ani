"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.validatePassword = exports.setUserByEmail = exports.emailDoesntExist = exports.validateSignedRole = exports.validateUserRole = exports.validateUpdateUser = exports.validateCreateNewUser = void 0;
const validation_1 = require("../utils/validation");
const user_1 = require("../models/user");
const validateCreateNewUser = (req, res, next) => {
    if (!req.body.email)
        return next("Please provide an email");
    if (!req.body.password)
        return next("Please provide a password");
    if (!(0, validation_1.validateEmail)(req.body.email))
        return next("Please provide a valid email");
    next();
};
exports.validateCreateNewUser = validateCreateNewUser;
const validateUpdateUser = (req, res, next) => {
    var _a;
    if (!req.body.password)
        return next("Please provide a password");
    if (!req.user)
        return next("User is not set in request");
    if ((0, user_1.validatePassword)(req.body.password, (_a = req.user) === null || _a === void 0 ? void 0 : _a.password))
        return next("The new password can not be the same as the last one");
    return next();
};
exports.validateUpdateUser = validateUpdateUser;
const validateUserRole = (...args) => {
    return (req, res, next) => {
        if (!req.body.role)
            return next("Please provide a role");
        if (!args.includes(req.body.role))
            return next("Please provide a valid role");
        return next();
    };
};
exports.validateUserRole = validateUserRole;
const validateSignedRole = (...args) => {
    return (req, res, next) => {
        if (!req.user)
            return next("User is not set in request");
        if (!args.includes(req.user.role))
            return next("User does not have a valid role");
        return next();
    };
};
exports.validateSignedRole = validateSignedRole;
const emailDoesntExist = (req, res, next) => {
    user_1.User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then((user) => {
        if (user != null)
            return next("Email already in use");
        return next();
    })
        .catch((err) => next("Something went wrong"));
};
exports.emailDoesntExist = emailDoesntExist;
const setUserByEmail = (req, res, next) => {
    console.log("setUserByEmail");
    user_1.User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then((user) => {
        if (user == null)
            return next("User does not exist");
        req.user = user;
        next();
    })
        .catch((err) => next("Something went wrong"));
};
exports.setUserByEmail = setUserByEmail;
const validatePassword = (req, res, next) => {
    var _a;
    if (!req.user)
        return next("User not set in Request");
    console.log("validatePassword");
    if (!(0, user_1.validatePassword)(req.body.password, (_a = req.user) === null || _a === void 0 ? void 0 : _a.password))
        return next("Wrong password");
    return next();
};
exports.validatePassword = validatePassword;
exports.authenticate = [exports.setUserByEmail, exports.validatePassword];
exports.default = {
    validateCreateNewUser: exports.validateCreateNewUser,
    emailDoesntExist: exports.emailDoesntExist,
    validatePassword: exports.validatePassword,
    authenticate: exports.authenticate,
    validateUserRole: exports.validateUserRole,
    validateUpdateUser: exports.validateUpdateUser,
    validateSignedRole: exports.validateSignedRole,
};
//# sourceMappingURL=userMiddleware.js.map