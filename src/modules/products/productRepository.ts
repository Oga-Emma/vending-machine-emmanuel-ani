import { Request, Response, NextFunction } from "express";
import { Product, IProduct } from "../../core/models/product";
import { Op } from "sequelize";
import { sanitizeProduct } from "../../core/utils/sanitize";

class ProductRepository {
    createProduct(name: string,
    amount: number,
    price: number,
    userId: number) {
        return Product.create({
            name: name,
            amount: amount,
            price: price,
            UserId: userId,
        });
    }

   updateProduct(data: any, options: any) {
        return Product.update(
            data,
            options
        );
    }

    deleteProduct(
        productId: number
    ){
        return Product.destroy({
            where: {
                id: productId,
            },
        });
    }

    queryProduct(
        queryOption: any
    ){
        return Product.findAndCountAll(queryOption)
    };
}

let productRepository = new ProductRepository();
export default productRepository;
