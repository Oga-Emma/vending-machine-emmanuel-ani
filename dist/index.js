"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const serverConfig_1 = __importDefault(require("./core/config/serverConfig"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = normalizePort(process.env.PORT || 8080);
const expressInstance = new serverConfig_1.default().expressInstance;
expressInstance.set("port", port);
const server = http_1.default.createServer(expressInstance);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
module.exports = server;
// Port Normalization
function normalizePort(val) {
    const port = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    return port >= 0 ? port : false;
}
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? `pipe ${addr}`
        : `Listetning on port ${addr && addr.port}`;
    console.log(bind);
}
//# sourceMappingURL=index.js.map