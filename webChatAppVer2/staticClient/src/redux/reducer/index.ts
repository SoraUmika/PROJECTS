import initState from "../store/initState";
import State from "../State";
import Action from "../Action";

import Client from "./client";
import Users from "./users";
import Form from "./form";
import Error from "./error";
import Notifications from "./notifications";
import LoginPage from "./loginPage";
import Setting from "./setting";
import SettingDialog from "./settingDialog";

const reducer = (state: State = initState, action: Action): State => ({
	client: Client(state.client, action),
	users: Users(state.users, action),
	form: Form(state.form, action),
	error: Error(state.error, action),
	notifications: Notifications(state.notifications, action),
	loginPage: LoginPage(state.loginPage, action),
	setting: Setting(state.setting, action),
	settingDialog: SettingDialog(state.settingDialog, action)
});

export default reducer;
