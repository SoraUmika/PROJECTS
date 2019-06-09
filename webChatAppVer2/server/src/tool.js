"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFactory = (id) => (description, pk) => {
    console.log("<" + id + ">: " + description);
    pk && console.log(pk);
};
exports.pkGuard = (pk) => pk;
