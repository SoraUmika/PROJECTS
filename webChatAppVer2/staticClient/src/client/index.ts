import * as socketClient from "socket.io-client";
import * as Packages from "./Packages";
import * as callbacks from "./callbacks";
import { StrObject } from "../util";

class Client {
	socket: SocketIOClient.Socket;
	tempListener: StrObject<((pk: any) => void)[]> = {};

	init() {
		let socket = socketClient.connect("http://localhost:8080");
		this.socket = socket;

		this.on(Packages.Names.loginResponse, callbacks.loginResponse);
		this.on(Packages.Names.userNetworkUpdate, callbacks.userNetworkUpdate);
		this.on(Packages.Names.signupResponse, callbacks.signupResponse);
	}

	private emit(name: Packages.AnyNames, pk: Packages.AnyPackages) {
		this.socket.emit(name, pk);
	}

	private on<T>(name: Packages.AnyNames, callback: (pk: T) => void) {
		this.socket.on(name, (pk: T) => {
			callback(pk);
			if (this.tempListener[name]) {
				this.tempListener[name].forEach(func => func(pk));
				delete this.tempListener[name];
			}
		});
	}

	registerTempListener<T>(name: Packages.AnyNames, callback: (pk: any) => void) {
		if (!this.tempListener[name]) {
			this.tempListener[name] = [];
		}
		this.tempListener[name].push(callback);
	}

	login(id: string, password: string) {
		console.log("login...");
		this.emit("login-request", {
			__type: "login-request",
			id: id,
			password: password
		});
	}

	signup(id: string, name: string, password: string) {
		console.log("signup...");
		this.emit("signup-request", {
			__type: "signup-request",
			id: id,
			name: name,
			password: password
		});
	}
}

let client = new Client();
export default client;
