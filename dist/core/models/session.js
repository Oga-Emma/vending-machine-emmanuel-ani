"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequilizeConfig_1 = require("../config/db/sequelize/sequilizeConfig");
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = require("./user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret_key_123";
const jwt = require("jsonwebtoken");
const Session = sequilizeConfig_1.databaseInstance.define("Session", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    jwt: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: (session) => {
            console.log("auth beforeCreate hook", session);
            const token = jwt.sign({ UserId: session.UserId }, JWT_SECRET_KEY);
            console.log("token", token);
            session.jwt = token;
        },
    },
});
exports.Session = Session;
Session.belongsTo(user_1.User, { onDelete: "cascade" });
user_1.User.hasMany(Session);
//# sourceMappingURL=session.js.map