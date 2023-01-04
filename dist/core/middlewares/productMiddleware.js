"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSearch = exports.userOwnsProduct = exports.existByProductIdBody = exports.existByIdParam = exports.validateProduct = void 0;
const product_1 = require("../models/product");
const validation_1 = require("../utils/validation");
const max_values_1 = require("../utils/max-values");
const validateProduct = (req, res, next) => {
    console.log("middlewares.product.validateProduct");
    if (!req.body.name)
        return next("Please provide a product name");
    if (req.body.amount == null)
        return next("Please provide an amount");
    if (req.body.price == null)
        return next("Please provide a price");
    if (req.body.amount < 0)
        return next("Amount can not be negative");
    if (req.body.price < 0)
        return next("Price can not be negative");
    if (req.body.amount > max_values_1.MAX_INTEGER)
        return next(`Amount max value ${max_values_1.MAX_INTEGER}`);
    if (req.body.price > max_values_1.MAX_INTEGER)
        return next(`Price max value ${max_values_1.MAX_INTEGER}`);
    return next();
};
exports.validateProduct = validateProduct;
const existByIdParam = (req, res, next) => {
    console.log("middlewares.product.existByIdParam");
    if (!req.params.id)
        return next("Please provide a product id");
    product_1.Product.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
        if (product == null)
            return next("Product does not exist");
        req.product = product;
        next();
    })
        .catch((err) => next(err));
};
exports.existByIdParam = existByIdParam;
const existByProductIdBody = (req, res, next) => {
    console.log("middlewares.product.existByProductIdBody");
    if (!req.body.productId)
        return next("Please provide a product id");
    product_1.Product.findOne({
        where: {
            id: req.body.productId,
        },
    })
        .then((product) => {
        if (product == null)
            return next("Product does not exist");
        req.product = product;
        return next();
    })
        .catch((err) => next(err));
};
exports.existByProductIdBody = existByProductIdBody;
const userOwnsProduct = (req, res, next) => {
    console.log("middlewares.product.userOwnsProduct");
    if (!req.user)
        return next("User is not set in request");
    if (!req.product)
        return next("Product is not set in request");
    if (req.user.id !== req.product.UserId)
        return next("You are not the seller of this product");
    next();
};
exports.userOwnsProduct = userOwnsProduct;
const validateSearch = (req, res, next) => {
    console.log("middlewares.product.validateSearch");
    req.productSearch = {
        skip: (0, validation_1.normalizeSearchParam)(Number(req.query.skip), 0, 0),
        take: (0, validation_1.normalizeSearchParam)(Number(req.query.take), 20, 0, 100),
        name: (0, validation_1.normalizeSearchParam)(req.query.name, ""),
        sellerId: (0, validation_1.normalizeSearchParam)(Number(req.query.sellerId), 0),
        priceMin: ((0, validation_1.normalizeSearchParam)(Number(req.query.priceMin), 0, 0)),
        priceMax: ((0, validation_1.normalizeSearchParam)(Number(req.query.priceMax), max_values_1.MAX_INTEGER, 0, max_values_1.MAX_INTEGER)),
        amountMin: ((0, validation_1.normalizeSearchParam)(Number(req.query.amountMin), 0, 0)),
        amountMax: ((0, validation_1.normalizeSearchParam)(Number(req.query.amountMax), max_values_1.MAX_INTEGER, 0, max_values_1.MAX_INTEGER)),
    };
    return next();
};
exports.validateSearch = validateSearch;
exports.default = {
    validateProduct: exports.validateProduct,
    existByIdParam: exports.existByIdParam,
    userOwnsProduct: exports.userOwnsProduct,
    validateSearch: exports.validateSearch,
    existByProductIdBody: exports.existByProductIdBody,
};
//# sourceMappingURL=productMiddleware.js.map