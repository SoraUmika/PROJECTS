import * as Packages from "./Packages";
import * as actions from "../redux/actions";

export const loginResponse = (pk: Packages.LoginResponse) => {
	const { success, userObject, errorType } = pk;
	actions.setLoginIdNotFoundError(false);
	actions.setLoginPasswordIncorrectError(false);
	if (success) {
		console.log("success");
		const { name, id, avatar } = userObject;
		actions.addUser({
			name: name,
			id: id,
			avatar: avatar,
			network: "online"
		});
		actions.setClientUser(id);
		actions.setLoginFormValues({ loginValueId: "", loginValuePassword: "" });
	} else {
		console.log("error: " + errorType);
		if (errorType === "idNotFound") {
			actions.setLoginIdNotFoundError(true);
			actions.addNotifToTempQueue({
				type: "error",
				message: "Id not found."
			});
			actions.setLoginFormValues({ loginValueId: "" });
		} else if (errorType === "passwordIncorrect") {
			actions.setLoginPasswordIncorrectError(true);
			actions.addNotifToTempQueue({
				type: "error",
				message: "Password is incorrect."
			});
			actions.setLoginFormValues({ loginValuePassword: "" });
		}
	}
};

export const userNetworkUpdate = (pk: Packages.UserNetworkUpdate) => {
	const { id, network } = pk;
	actions.setUserNetworkMode(id, network);
};

export const signupResponse = (pk: Packages.SignupResponse) => {
	if (pk.success) {
		console.log("signup successful");
		actions.setSignupFormValues({
			signupValueId: "",
			signupValueName: "",
			signupValuePassword: "",
			signupValuePwConfirm: ""
		});
	} else {
		if (pk.errorType === "idAlreadyExist") {
			console.log("failed, id already exist.");
			actions.setSignupIdIsAlreadyExistError(true);
			actions.addNotifToTempQueue({ type: "error", message: "Id already exist" });
			actions.setSignupFormValues({ signupValueId: "" });
		}
	}
};
