import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../../core/models/user";
import { Product, IProduct } from "../../core/models/product";
import { databaseInstance } from "../../core/config/db/sequelize/sequilizeConfig";
import { computeChangeArray } from "../../core/utils";


class PurchaseRepository {
    updateBalance (newBalance: number, userId: number) {
        return User.update(
            {
                balance: newBalance,
            },
            {
                where: {
                    id: userId,
                },
                fields: ["balance"],
            }
        )
    }

    resetBalance (
        userId: number
    ){
        return User.update(
            {
                balance: 0,
            },
            {
                where: {
                    id: userId,
                },
                fields: ["balance"],
            }
        );
    }

    buyProduct(amount: number, userId: number, productId: number) {
            return databaseInstance.transaction((t: any) => {
                return User.update(
                    {
                        balance: 0,
                    },
                    {
                        where: {
                            id: userId, // type guard fails
                        },
                        fields: ["balance"],
                        transaction: t,
                    }
                )
                    .then(() => {
                        return Product.update(
                            {
                                amount: amount,
                            },
                            {
                                where: {
                                    id: productId, // type guard fails
                                },
                                fields: ["amount"],
                                transaction: t,
                            }
                        )
                    })
            });
    };
}

let purchaseRepository = new PurchaseRepository();
export default purchaseRepository
