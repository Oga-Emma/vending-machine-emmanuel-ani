"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routerConfig_1 = __importDefault(require("./routerConfig"));
class ServerConfig {
    constructor() {
        this.expressInstance = (0, express_1.default)();
        this.expressInstance.use((0, cors_1.default)());
        this.expressInstance.use(body_parser_1.default.urlencoded({ extended: true }));
        this.expressInstance.use(body_parser_1.default.json());
        this.expressInstance.use(new routerConfig_1.default().router);
        this.expressInstance.use((err, req, res, next) => {
            res.status(500).json({
                message: err,
            });
        });
    }
}
exports.default = ServerConfig;
//# sourceMappingURL=serverConfig.js.map