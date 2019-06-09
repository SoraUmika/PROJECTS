import * as pl from "./Payload";
import User from "../../client/User";
import UserNetworkMode from "../../client/UserNetMode";
import { TempNotif, PersistNotif } from "../../containers/Notifier/Notification";
import { Setting } from "../State";

type AnyActions =
	| AddUser
	| CleanUser
	| SetClientUser
	| SetLoginFormValues
	| SetLoginIdNotFoundError
	| SetLoginPasswordIncorrectError
	| SetUserNetworkMode
	| AddNotifTotempQueue
	| CleanNotiftempQueue
	| AddNotifToPersistStore
	| RemoveNotifInPersistStore
	| AddNotifTopersistQueue
	| CleanNotifInpersistQueue
	| CleanPersistStore
	| SetLoginFormPasswordVisible
	| SetSignupFormValues
	| SetSignupIdIsAlreadyExistError
	| SetLoginPagePending
	| SetLoginPageLoginDisplay
	| SetLoginPageSignupDisplay
	| UpdateSetting
	| SetSettingDialogOpen
	| SetNotificationDialogOpen;

type AddUser = {
	type: "users/<add>";
	payload: User;
};

type CleanUser = {
	type: "users/<clean>";
	payload: {};
};

type SetClientUser = {
	type: "client/user/<set>";
	payload: pl.Id;
};

type SetLoginFormValues = {
	type: "form/login/value/<set>";
	payload: {
		loginValueId?: string;
		loginValuePassword?: string;
	};
};

type SetLoginFormPasswordVisible = {
	type: "form/login/passwordVisible/<set>";
	payload: pl.Val<boolean>;
};

type SetLoginIdNotFoundError = {
	type: "error/loginIdNotFound/<set>";
	payload: pl.Val<boolean>;
};

type SetLoginPasswordIncorrectError = {
	type: "error/loginPasswordIncorrect/<set>";
	payload: pl.Val<boolean>;
};

type SetUserNetworkMode = {
	type: "users/network/<set>";
	payload: pl.Val<UserNetworkMode> & pl.Id;
};

type AddNotifTotempQueue = {
	type: "notifications/tempQueue/<add>";
	payload: TempNotif;
};

type CleanNotiftempQueue = {
	type: "notifications/tempQueue/<clean>";
	payload: {};
};

type AddNotifToPersistStore = {
	type: "notifications/persistStore/<add>";
	payload: PersistNotif;
};

type RemoveNotifInPersistStore = {
	type: "notifications/persistStore/<remove>";
	payload: pl.Id;
};

type CleanPersistStore = {
	type: "notifications/persistStore/<clean>";
	payload: {};
};

type AddNotifTopersistQueue = {
	type: "notifications/persistQueue/<add>";
	payload: PersistNotif;
};

type CleanNotifInpersistQueue = {
	type: "notifications/persistQueue/<clean>";
	payload: {};
};

type SetSignupFormValues = {
	type: "form/signup/value/<set>";
	payload: {
		signupValueId?: string;
		signupValueName?: string;
		signupValuePassword?: string;
		signupValuePwConfirm?: string;
	};
};

type SetSignupIdIsAlreadyExistError = {
	type: "error/SignupIdIsAlreadyExist/<set>";
	payload: pl.Val<boolean>;
};

type SetLoginPagePending = {
	type: "loginPage/pending/<set>";
	payload: pl.Val<boolean>;
};

type SetLoginPageSignupDisplay = {
	type: "loginPage/signupDisplay/<set>";
	payload: pl.Val<boolean>;
};

type SetLoginPageLoginDisplay = {
	type: "loginPage/loginDisplay/<set>";
	payload: pl.Val<boolean>;
};

type UpdateSetting = {
	type: "setting/<update>";
	payload: Partial<Setting>;
};

type SetSettingDialogOpen = {
	type: "settingDialog/open/<set>";
	payload: pl.Val<boolean>;
};

type SetNotificationDialogOpen = {
	type: "notifications/dialogOpen/<set>";
	payload: pl.Val<boolean>;
};

export default AnyActions;
