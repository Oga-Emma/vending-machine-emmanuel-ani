"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buy = exports.resetBalance = exports.deposit = void 0;
const utils_1 = require("../../core/utils");
const purchaseRepository_1 = __importDefault(require("./purchaseRepository"));
const deposit = (req, res, next) => {
    console.log("controller.purchase.deposit");
    if (!req.user)
        return next("User is not set in request");
    const newBalance = req.user.balance + req.body.coin;
    purchaseRepository_1.default.updateBalance(newBalance, req.user.id)
        .then(() => {
        res.status(200).json({
            balance: newBalance,
        });
    })
        .catch((err) => next(err));
};
exports.deposit = deposit;
const resetBalance = (req, res, next) => {
    console.log("controller.purchase.resetBalance");
    if (!req.user)
        return next("User is not set in request");
    const changeArray = (0, utils_1.computeChangeArray)(req.user.balance);
    purchaseRepository_1.default.resetBalance(req.user.id)
        .then(() => {
        res.status(200).json({
            balance: 0,
            change: changeArray,
        });
    })
        .catch((err) => next(err));
};
exports.resetBalance = resetBalance;
const buy = (req, res, next) => {
    var _a, _b;
    console.log("controller.purchase.buy");
    if (!req.user)
        return next("User is not set in request");
    if (!req.product)
        return next("Product is not set in request");
    const changeAmount = req.user.balance - req.body.amount * req.product.price;
    const changeArray = (0, utils_1.computeChangeArray)(changeAmount);
    const newAmount = req.product.amount - req.body.amount;
    const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0;
    const productId = ((_b = req.product) === null || _b === void 0 ? void 0 : _b.id) || 0;
    try {
        purchaseRepository_1.default.buyProduct(changeAmount, userId, productId)
            .then(() => {
            res.status(200).send({
                balance: 0,
                amount: newAmount,
                change: changeArray,
            });
        })
            .catch((err) => {
            return next(err);
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.buy = buy;
exports.default = {
    deposit: exports.deposit,
    resetBalance: exports.resetBalance,
    buy: exports.buy,
};
//# sourceMappingURL=purchaseService.js.map