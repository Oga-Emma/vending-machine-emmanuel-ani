"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.get = exports.deleteProduct = exports.update = exports.add = void 0;
const sequelize_1 = require("sequelize");
const sanitize_1 = require("../../core/utils/sanitize");
const productRepository_1 = __importDefault(require("./productRepository"));
const add = (req, res, next) => {
    console.log("controller.product.update");
    if (!req.user)
        return next("User is not set in request");
    productRepository_1.default.createProduct(req.body.name, req.body.amount, req.body.price, req.user.id)
        .then((product) => {
        res.status(200).json((0, sanitize_1.sanitizeProduct)(product));
    })
        .catch((err) => next(err));
};
exports.add = add;
const update = (req, res, next) => {
    console.log("controller.product.update");
    if (!req.product)
        return next("Product is not set in request");
    productRepository_1.default.updateProduct({
        name: req.body.name || req.product.name,
        amount: req.body.amount || req.product.amount,
        price: req.body.price || req.product.price,
    }, {
        fields: ["name", "amount", "price"],
        where: {
            id: req.params.id,
        },
    })
        .then((affectedRows) => {
        var _a;
        const [count, products] = affectedRows;
        if (count === 0)
            return next("Something went wrong");
        res.status(200).json({
            id: ((_a = req.product) === null || _a === void 0 ? void 0 : _a.id) || 0,
            price: req.body.price,
            amount: req.body.amount,
            name: req.body.name,
        });
    })
        .catch((err) => next(err));
};
exports.update = update;
const deleteProduct = (req, res, next) => {
    if (!req.product)
        return next("Product is not set in request");
    productRepository_1.default.deleteProduct(req.product.id)
        .then(() => {
        res.status(200).end();
    })
        .catch((err) => next(err));
};
exports.deleteProduct = deleteProduct;
const get = (req, res, next) => {
    console.log("controller.product.get");
    if (!req.product)
        return next("Product is not set in request");
    res.status(200).json((0, sanitize_1.sanitizeProduct)(req.product));
};
exports.get = get;
const getCollection = (req, res, next) => {
    console.log("controller.product.getCollection");
    if (!req.productSearch)
        return next("ProdutSearch is not set in request");
    console.log(req.productSearch);
    let sellerFilter = {};
    if (req.productSearch.sellerId)
        sellerFilter = {
            UserId: {
                [sequelize_1.Op.eq]: req.productSearch.sellerId,
            },
        };
    productRepository_1.default.queryProduct({
        where: Object.assign(Object.assign({ name: {
                [sequelize_1.Op.like]: `%${req.productSearch.name}%`,
            } }, sellerFilter), { amount: {
                [sequelize_1.Op.between]: [
                    req.productSearch.amountMin,
                    req.productSearch.amountMax,
                ],
            }, price: {
                [sequelize_1.Op.between]: [
                    req.productSearch.priceMin,
                    req.productSearch.priceMax,
                ],
            } }),
        offset: req.productSearch.skip,
        limit: req.productSearch.take,
    })
        .then((result) => {
        res.status(200).json({
            count: result.count,
            list: result.rows.map(sanitize_1.sanitizeProduct),
        });
    })
        .catch((err) => next(err));
};
exports.getCollection = getCollection;
exports.default = {
    add: exports.add,
    update: exports.update,
    deleteProduct: exports.deleteProduct,
    get: exports.get,
    getCollection: exports.getCollection,
};
//# sourceMappingURL=productService.js.map