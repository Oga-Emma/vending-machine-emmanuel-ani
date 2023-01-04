"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePurchase = exports.validateMaxBalance = exports.validateCoin = void 0;
const max_values_1 = require("../utils/max-values");
const enums_1 = require("../types/enums");
const validateCoin = (req, res, next) => {
    console.log("middlewares.purchase.validateCoin");
    console.log(req.body);
    if (!req.body.coin)
        return next("Please provide a coin value");
    if (![enums_1.Coin.five, enums_1.Coin.ten, enums_1.Coin.twenty, enums_1.Coin.fifty, enums_1.Coin.hundred].includes(req.body.coin))
        return next("Please provide a valid coin value");
    return next();
};
exports.validateCoin = validateCoin;
const validateMaxBalance = (req, res, next) => {
    if (!req.user)
        return next("User is not set in request");
    if (req.user.balance + req.body.coin > max_values_1.MAX_INTEGER)
        return next("New balance exceeds maximum balance");
    return next();
};
exports.validateMaxBalance = validateMaxBalance;
const validatePurchase = (req, res, next) => {
    if (!req.user)
        return next("User is not set in request");
    if (!req.product)
        return next("Product is not set in request");
    if (!req.body.amount)
        return next("Please provide an amount");
    if (typeof req.body.amount !== "number")
        return next("Please provide a number amount");
    if (req.body.amount <= 0)
        return next("Please provide a positive amount");
    if (req.body.amount > req.product.amount)
        return next("Product is not available in such high amounts");
    if (req.body.amount * req.product.price > req.user.balance)
        return next("User balance is not enough");
    return next();
};
exports.validatePurchase = validatePurchase;
exports.default = {
    validateCoin: exports.validateCoin,
    validateMaxBalance: exports.validateMaxBalance,
    validatePurchase: exports.validatePurchase,
};
//# sourceMappingURL=purchaseMiddleware.js.map