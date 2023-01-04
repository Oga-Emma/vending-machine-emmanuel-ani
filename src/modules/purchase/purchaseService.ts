import {Request, Response, NextFunction} from "express";
import {computeChangeArray} from "../../core/utils";
import purchaseRepository from "./purchaseRepository";

export const deposit = (req: Request, res: Response, next: NextFunction) => {
    console.log("controller.purchase.deposit");
    if (!req.user) return next("User is not set in request");
    const newBalance = req.user.balance + req.body.coin;

    purchaseRepository.updateBalance(newBalance, req.user.id)
        .then(() => {
            res.status(200).json({
                balance: newBalance,
            });
        })
        .catch((err: any) => next(err));
};

export const resetBalance = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("controller.purchase.resetBalance");
    if (!req.user) return next("User is not set in request");
    const changeArray = computeChangeArray(req.user.balance);
    purchaseRepository.resetBalance(req.user.id)
        .then(() => {
            res.status(200).json({
                balance: 0,
                change: changeArray,
            });
        })
        .catch((err: any) => next(err));
};

export const buy = (req: Request, res: Response, next: NextFunction) => {
    console.log("controller.purchase.buy");
    if (!req.user) return next("User is not set in request");
    if (!req.product) return next("Product is not set in request");

    const changeAmount = req.user.balance - req.body.amount * req.product.price;
    const changeArray = computeChangeArray(changeAmount);
    const newAmount = req.product.amount - req.body.amount;

    const userId = req.user?.id || 0
    const productId = req.product?.id || 0

    try {
        purchaseRepository.buyProduct(changeAmount, userId, productId)
            .then(() => {
                res.status(200).send({
                    balance: 0,
                    amount: newAmount,
                    change: changeArray,
                });
            })
            .catch((err: any) => {
                return next(err);
            });
    } catch (err: any) {
        return next(err);
    }
};

export default {
    deposit,
    resetBalance,
    buy,
};
