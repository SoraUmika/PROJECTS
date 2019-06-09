import store from "./store";
import User from "../client/User";
import { PersistNotif, TempNotif } from "../containers/Notifier/Notification";
import UserNetworkMode from "../client/UserNetMode";
import { uid, Omit } from "../util";
import { Setting } from "./State";
const { dispatch } = store;

export const addUser = (user: User) =>
	dispatch({
		type: "users/<add>",
		payload: user
	});

export const cleanUser = () =>
	dispatch({
		type: "users/<clean>",
		payload: {}
	});

export const setClientUser = (id: string) =>
	dispatch({
		type: "client/user/<set>",
		payload: {
			id: id
		}
	});

export const setLoginFormValues = (val: { loginValueId?: string; loginValuePassword?: string }) =>
	dispatch({
		type: "form/login/value/<set>",
		payload: val
	});

export const setLoginFormPasswordVisible = (val: boolean) =>
	dispatch({
		type: "form/login/passwordVisible/<set>",
		payload: {
			value: val
		}
	});

export const setLoginIdNotFoundError = (val: boolean) =>
	dispatch({
		type: "error/loginIdNotFound/<set>",
		payload: {
			value: val
		}
	});

export const setLoginPasswordIncorrectError = (val: boolean) =>
	dispatch({
		type: "error/loginPasswordIncorrect/<set>",
		payload: {
			value: val
		}
	});

export const setUserNetworkMode = (id: string, network: UserNetworkMode) =>
	dispatch({
		type: "users/network/<set>",
		payload: {
			id: id,
			value: network
		}
	});

export const addNotifToTempQueue = (notif: Omit<TempNotif, "id">) =>
	dispatch({
		type: "notifications/tempQueue/<add>",
		payload: {
			...notif,
			id: uid()
		}
	});

export const cleanTempNotifQueue = () =>
	dispatch({
		type: "notifications/tempQueue/<clean>",
		payload: {}
	});

export const addNotifInPersistStore = (notif: PersistNotif) =>
	dispatch({
		type: "notifications/persistStore/<add>",
		payload: notif
	});

export const removeNotifFromPersistStore = (id: string) =>
	dispatch({
		type: "notifications/persistStore/<remove>",
		payload: {
			id: id
		}
	});

export const cleanPersistNotifQueue = () =>
	dispatch({
		type: "notifications/persistStore/<clean>",
		payload: {}
	});

export const addNotifToPersistQueue = (notif: PersistNotif) =>
	dispatch({
		type: "notifications/persistQueue/<add>",
		payload: notif
	});

export const cleanNotifInPersistQueue = () =>
	dispatch({
		type: "notifications/persistQueue/<clean>",
		payload: {}
	});

export const setSignupFormValues = (val: {
	signupValueId?: string;
	signupValueName?: string;
	signupValuePassword?: string;
	signupValuePwConfirm?: string;
}) =>
	dispatch({
		type: "form/signup/value/<set>",
		payload: val
	});

export const setSignupIdIsAlreadyExistError = (val: boolean) =>
	dispatch({
		type: "error/SignupIdIsAlreadyExist/<set>",
		payload: {
			value: val
		}
	});

export const setLoginPagePending = (val: boolean) =>
	dispatch({
		type: "loginPage/pending/<set>",
		payload: {
			value: val
		}
	});

export const setLoginPageSignupDisplay = (val: boolean) =>
	dispatch({
		type: "loginPage/signupDisplay/<set>",
		payload: {
			value: val
		}
	});

export const setLoginPageLoginDisplay = (val: boolean) =>
	dispatch({
		type: "loginPage/loginDisplay/<set>",
		payload: {
			value: val
		}
	});

export const updateSetting = (setting: Partial<Setting>) =>
	dispatch({
		type: "setting/<update>",
		payload: setting
	});

export const SetSettingDialogOpen = (val: boolean) =>
	dispatch({
		type: "settingDialog/open/<set>",
		payload: {
			value: val
		}
	});

export const SetNotificationDialogOpen = (val: boolean) =>
	dispatch({
		type: "notifications/dialogOpen/<set>",
		payload: {
			value: val
		}
	});
