"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../core/models/user");
const product_1 = require("../../core/models/product");
const sequilizeConfig_1 = require("../../core/config/db/sequelize/sequilizeConfig");
class PurchaseRepository {
    updateBalance(newBalance, userId) {
        return user_1.User.update({
            balance: newBalance,
        }, {
            where: {
                id: userId,
            },
            fields: ["balance"],
        });
    }
    resetBalance(userId) {
        return user_1.User.update({
            balance: 0,
        }, {
            where: {
                id: userId,
            },
            fields: ["balance"],
        });
    }
    buyProduct(amount, userId, productId) {
        return sequilizeConfig_1.databaseInstance.transaction((t) => {
            return user_1.User.update({
                balance: 0,
            }, {
                where: {
                    id: userId, // type guard fails
                },
                fields: ["balance"],
                transaction: t,
            })
                .then(() => {
                return product_1.Product.update({
                    amount: amount,
                }, {
                    where: {
                        id: productId, // type guard fails
                    },
                    fields: ["amount"],
                    transaction: t,
                });
            });
        });
    }
    ;
}
let purchaseRepository = new PurchaseRepository();
exports.default = purchaseRepository;
//# sourceMappingURL=purchaseRepository.js.map