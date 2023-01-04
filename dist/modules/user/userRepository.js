"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../core/models/user");
class UserRepository {
    constructor(userDb) {
        this.db = userDb;
    }
    findAllUsers() {
        return user_1.User.findAll();
    }
    findUserByEmail(email) {
        return user_1.User.findOne({
            where: {
                email: email,
            },
        });
    }
    ;
    saveUser(data) {
        return user_1.User.create(Object.assign({}, data));
    }
    ;
    updateUser(data, options) {
        return user_1.User.update(data, options);
    }
    ;
    deleteUser(option) {
        return user_1.User.destroy(option);
    }
    ;
}
let userRepository = new UserRepository(user_1.User);
exports.default = userRepository;
//# sourceMappingURL=userRepository.js.map