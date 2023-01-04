"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeProduct = void 0;
const sanitizeProduct = (product) => ({
    id: product.id,
    name: product.name,
    amount: product.amount,
    price: product.price,
});
exports.sanitizeProduct = sanitizeProduct;
//# sourceMappingURL=sanitize.js.map