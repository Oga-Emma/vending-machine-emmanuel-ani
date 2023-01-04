"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.User = exports.salt = void 0;
const sequilizeConfig_1 = require("../config/db/sequelize/sequilizeConfig");
const sequelize_1 = __importDefault(require("sequelize"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const enums_1 = require("../types/enums");
const SALT_ROUNDS = 10;
exports.salt = bcrypt_1.default.genSaltSync(SALT_ROUNDS);
const User = sequilizeConfig_1.databaseInstance.define("User", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    balance: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    role: {
        type: sequelize_1.default.ENUM(enums_1.UserRoles.Buyer, enums_1.UserRoles.Seller, enums_1.UserRoles.Admin),
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: (user) => {
            const cryptedPassword = bcrypt_1.default.hashSync(user.password, exports.salt);
            user.password = cryptedPassword;
        },
    },
});
exports.User = User;
const validatePassword = (password, cryptedPassword) => {
    return bcrypt_1.default.compareSync(password, cryptedPassword);
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=user.js.map