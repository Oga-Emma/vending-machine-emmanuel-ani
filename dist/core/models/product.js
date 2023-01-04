"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequilizeConfig_1 = require("../config/db/sequelize/sequilizeConfig");
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = require("./user");
const Product = sequilizeConfig_1.databaseInstance.define("Product", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
});
exports.Product = Product;
Product.belongsTo(user_1.User, { onDelete: "cascade" });
user_1.User.hasMany(Product);
//# sourceMappingURL=product.js.map