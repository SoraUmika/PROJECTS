import { StrObject } from "../util";
import { TempNotif, PersistNotif } from "../containers/Notifier/Notification";
import User from "../client/User";

type State = {
	client: Client;
	users: Users;
	form: Form;
	error: Error;
	notifications: Notifications;
	loginPage: LoginPage;
	setting: Setting;
	settingDialog: SettingDialog;
};

export type Client = {
	user: string | null;
};

export type Users = StrObject<User>;

export type Form = {
	loginValueId: string;
	loginValuePassword: string;
	loginPasswordVisible: boolean;
	signupValueId: string;
	signupValueName: string;
	signupValuePassword: string;
	signupValuePwConfirm: string;
};

export type LoginPage = {
	pending: boolean;
	signupDisplay: boolean;
	loginDisplay: boolean;
};

export type Error = {
	loginIdNotFound: boolean;
	loginPasswordIncorrect: boolean;
	SignupIdIsAlreadyExist: boolean;
};

export type Notifications = {
	persistStore: StrObject<PersistNotif>;
	persistQueue: PersistNotif[];
	tempQueue: TempNotif[];
	dialogOpen: boolean;
};

export type Setting = {
	notificationDurationMode: "auto" | "custom";
	notificationDurationEntering: number;
	notificationDurationExisting: number;
	notificationDurationDisplaying: number;
	notificationPositionDisplay: "top" | "bottom";
	notificationPositionInsert: "top" | "bottom";
};

export type SettingDialog = {
	open: boolean;
};

export default State;
