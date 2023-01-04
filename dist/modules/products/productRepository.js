"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../core/models/product");
class ProductRepository {
    createProduct(name, amount, price, userId) {
        return product_1.Product.create({
            name: name,
            amount: amount,
            price: price,
            UserId: userId,
        });
    }
    updateProduct(data, options) {
        return product_1.Product.update(data, options);
    }
    deleteProduct(productId) {
        return product_1.Product.destroy({
            where: {
                id: productId,
            },
        });
    }
    queryProduct(queryOption) {
        return product_1.Product.findAndCountAll(queryOption);
    }
    ;
}
let productRepository = new ProductRepository();
exports.default = productRepository;
//# sourceMappingURL=productRepository.js.map