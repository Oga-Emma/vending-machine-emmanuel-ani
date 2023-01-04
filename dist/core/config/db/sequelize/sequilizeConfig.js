"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseInstance = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("./config/config"));
class SequilizeConfig {
    constructor() {
        if (process.env.NODE_ENV === "test") {
            this.database = new sequelize_1.default(`${config_1.default.test.url}`);
        }
        else if (process.env.NODE_ENV === "dev") {
            this.database = new sequelize_1.default(`${config_1.default.development.url}`);
        }
        else if (process.env.NODE_ENV === "sandbox") {
            this.database = new sequelize_1.default(`${config_1.default.sandbox.url}`);
        }
        else {
            this.database = new sequelize_1.default(`${config_1.default.production.url}`);
        }
        this.database
            .authenticate()
            .then(() => {
            console.log("Connected to database successfully!");
        })
            .catch((err) => {
            console.error("Unable to connect to database ", err);
        });
        this.database.sync({
            force: process.env.NODE_ENV === "test",
        });
    }
}
exports.default = SequilizeConfig;
exports.databaseInstance = new SequilizeConfig().database;
//# sourceMappingURL=sequilizeConfig.js.map