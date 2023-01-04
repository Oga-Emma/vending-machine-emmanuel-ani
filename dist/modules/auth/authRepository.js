"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_1 = require("../../core/models/session");
class AuthRepository {
    generateJWT(userId) {
        return session_1.Session.create({
            UserId: userId,
            jwt: "",
        });
    }
    deleteSession(sessionId) {
        return session_1.Session.destroy({
            where: {
                id: sessionId,
            },
        });
    }
    ;
    deleteAllSessions(userId) {
        return session_1.Session.destroy({
            where: {
                UserId: userId,
            },
        });
    }
    ;
}
let authRepository = new AuthRepository();
exports.default = authRepository;
//# sourceMappingURL=authRepository.js.map