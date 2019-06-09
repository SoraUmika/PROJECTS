import { User } from "./data";

export type AnyPackages =
	| LoginRequest
	| LoginResponse
	| UserNetworkUpdate
	| SignupRequest
	| SignupResponse;
export type AnyNames =
	| "login-request"
	| "login-response"
	| "user-network-update"
	| "signup-request"
	| "signup-response";
export enum Names {
	loginRequest = "login-request",
	loginResponse = "login-response",
	userNetworkUpdate = "user-network-update",
	signupRequest = "signup-request",
	signupResponse = "signup-response"
}

export type LoginRequest = {
	__type: "login-request";
	id: string;
	password: string;
};

export type LoginResponse = {
	__type: "login-response";
	success: boolean;
	errorType: "idNotFound" | "passwordIncorrect" | null;
	userObject: User | null;
};

export type UserNetworkUpdate = {
	__type: "user-network-update";
	id: string;
	network: "online" | "offline";
};

export type SignupRequest = {
	__type: "signup-request";
	id: string;
	name: string;
	password: string;
};

export type SignupResponse = {
	__type: "signup-response";
	success: boolean;
	errorType: "idAlreadyExist" | null;
};
