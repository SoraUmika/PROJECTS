"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataManager {
    constructor() {
        this.data = {
            users: {
                testId: {
                    name: "testName",
                    id: "testId",
                    password: "testPassword",
                    avatar: null,
                    contact: [],
                    rooms: []
                }
            },
            online: []
        };
    }
    isUserExist(id) {
        return id in this.data.users;
    }
    getUser(id) {
        return this.data.users[id];
    }
    addUser(id, name, password) {
        this.data.users[id] = {
            name: name,
            id: id,
            password: password,
            avatar: null,
            contact: [],
            rooms: []
        };
    }
    setAsOnlineUser(id) {
        this.data.online.push(id);
    }
}
exports.default = new DataManager();
