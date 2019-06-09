import express from "express";
import socket from "socket.io";

import { pkGuard, logFactory, Omit } from "./src/tool";
import * as pks from "./src/packages";
import DataManager from "./src/data";

let app = express();

let server = app.listen(8080, () => {
	console.log("Server listening on port 8080");
});

let io = socket(server);

io.on("connection", socket => {
	const log = logFactory(socket.id);
	log("Connected");

	socket.on(pks.Names.loginRequest, (pk: pks.LoginRequest) => {
		const { id, password } = pk;
		let payload: Omit<pks.LoginResponse, "__type">;
		log("Requested a login.", pk);
		if (DataManager.isUserExist(id)) {
			if (password === DataManager.getUser(id).password) {
				log("Login approved.");
				payload = {
					success: true,
					errorType: null,
					userObject: DataManager.getUser(id)
				};
				DataManager.setAsOnlineUser(id);
			} else {
				log("Login dismissed, password incorrect.");
				payload = {
					success: false,
					errorType: "passwordIncorrect",
					userObject: null
				};
			}
		} else {
			log("Login dismissed, id not found.");
			payload = {
				success: false,
				errorType: "idNotFound",
				userObject: null
			};
		}
		socket.emit(
			pks.Names.loginResponse,
			pkGuard({
				__type: "login-response",
				...payload
			})
		);
	});

	socket.on(pks.Names.signupRequest, (pk: pks.SignupRequest) => {
		const { id, name, password } = pk;
		let payload: Omit<pks.SignupResponse, "__type">;
		log("requested a signup", pk);
		if (DataManager.isUserExist(id)) {
			log("signup dismissed, id already exist");
			payload = {
				success: false,
				errorType: "idAlreadyExist"
			};
		} else {
			log("signup approved");
			payload = {
				success: true,
				errorType: null
			};
			DataManager.addUser(id, name, password);
		}
		socket.emit(
			pks.Names.signupResponse,
			pkGuard({
				__type: "signup-response",
				...payload
			})
		);
	});
});
