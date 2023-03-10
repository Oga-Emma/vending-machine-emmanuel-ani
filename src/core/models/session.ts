import { databaseInstance } from "../config/db/sequelize/sequilizeConfig";
import sequelize from "sequelize";
import { UserRoles } from "../types/enums";
import { User, IUser } from "./user";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret_key_123";
const jwt = require("jsonwebtoken");

export interface ISession {
    id: number;
    UserId: number;
    jwt: string;
    User?: IUser;
}

const Session: sequelize.Model<ISession, {}> = databaseInstance.define<
    ISession,
    {}
>(
    "Session",
    {
        id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        jwt: {
            type: sequelize.STRING,
            allowNull: false,
        },
    },
    {
        hooks: {
            beforeCreate: (session: ISession) => {
                console.log("auth beforeCreate hook", session);
                const token = jwt.sign(
                    { UserId: session.UserId },
                    JWT_SECRET_KEY
                );
                console.log("token", token);
                session.jwt = token;
            },
        },
    }
);

Session.belongsTo(User, { onDelete: "cascade" });
User.hasMany(Session);

export { Session };
