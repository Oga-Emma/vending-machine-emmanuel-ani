import sequelize, {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

import dbConfig from "./config/config"

export default class SequilizeConfig {
    database: Sequelize;

    constructor() {
        if (process.env.NODE_ENV === "test") {
            this.database = new sequelize(`${dbConfig.test.url}`);
        } else if (process.env.NODE_ENV === "dev") {
            this.database = new sequelize(`${dbConfig.development.url}`);
        } else if (process.env.NODE_ENV === "sandbox") {
            this.database = new sequelize(`${dbConfig.sandbox.url}`);
        } else {
            this.database = new sequelize(`${dbConfig.production.url}`);
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

export const databaseInstance = new SequilizeConfig().database;
