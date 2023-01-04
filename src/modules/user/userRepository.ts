import {User, IUser} from "../../core/models/user";
import bcrypt from "bcrypt";
import sequelize from "sequelize";

class UserRepository {
    private db: sequelize.Model<IUser, {}>;
    constructor(userDb: sequelize.Model<IUser, {}>) {
        this.db = userDb;
    }

    findAllUsers(): Promise<IUser[]> {
        return User.findAll();
    }

    findUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({
            where: {
                email: email,
            },
        })
    };

    saveUser(data: any): Promise<IUser>{
        return User.create({
            ...data
        })
    };

    updateUser(data: any, options: any) {
        return User.update(
            data,
            options,
        );
    };

    deleteUser(option: any) {
        return User.destroy(option)
    };
}

let userRepository = new UserRepository(User);
export default userRepository;
