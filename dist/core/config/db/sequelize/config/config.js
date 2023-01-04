"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let dbConfig = {
    test: {
        url: "sqlite:memory:",
        dialect: "postgres"
    },
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: "postgres"
    },
    sandbox: {
        url: process.env.SANDBOX_DATABASE_URL,
        dialect: "postgres"
    },
    production: {
        url: process.env.PROD_DATABASE_URL,
        dialect: "postgres"
    }
};
exports.default = dbConfig;
//# sourceMappingURL=config.js.map