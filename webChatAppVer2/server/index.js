"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const tool_1 = require("./src/tool");
const pks = __importStar(require("./src/packages"));
const data_1 = __importDefault(require("./src/data"));
let app = express_1.default();
let server = app.listen(8080, () => {
    console.log("Server listening on port 8080");
});
let io = socket_io_1.default(server);
io.on("connection", socket => {
    const log = tool_1.logFactory(socket.id);
    log("Connected");
    socket.on(pks.Names.loginRequest, (pk) => {
        const { id, password } = pk;
        let payload;
        log("Requested a login.", pk);
        if (data_1.default.isUserExist(id)) {
            if (password === data_1.default.getUser(id).password) {
                log("Login approved.");
                payload = {
                    success: true,
                    errorType: null,
                    userObject: data_1.default.getUser(id)
                };
                data_1.default.setAsOnlineUser(id);
            }
            else {
                log("Login dismissed, password incorrect.");
                payload = {
                    success: false,
                    errorType: "passwordIncorrect",
                    userObject: null
                };
            }
        }
        else {
            log("Login dismissed, id not found.");
            payload = {
                success: false,
                errorType: "idNotFound",
                userObject: null
            };
        }
        socket.emit(pks.Names.loginResponse, tool_1.pkGuard(Object.assign({ __type: "login-response" }, payload)));
    });
    socket.on(pks.Names.signupRequest, (pk) => {
        const { id, name, password } = pk;
        let payload;
        log("requested a signup", pk);
        if (data_1.default.isUserExist(id)) {
            log("signup dismissed, id already exist");
            payload = {
                success: false,
                errorType: "idAlreadyExist"
            };
        }
        else {
            log("signup approved");
            payload = {
                success: true,
                errorType: null
            };
            data_1.default.addUser(id, name, password);
        }
        socket.emit(pks.Names.signupResponse, tool_1.pkGuard(Object.assign({ __type: "signup-response" }, payload)));
    });
});
