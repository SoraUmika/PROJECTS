import SettingType from './settingType';
import ThemeType from './themeType';
import UserType from './userType';
import { Nullable } from '../../types';

type PLIndex<T> = { index: T };
type PLToggle = { bool: boolean };
type PLUserId = { id: string };

type Action =
	| ClickPageNav
	| ClickSettingNav
	| ToggleSettingDialog
	| UpdateTempSetting
	| UpdateTempTheme
	| UpdateSetting
	| UpdateTheme
	| CleanTempSettModi
	| AddUserToUsers
	| AddUserToContact
	| OpenUserInChat
	| AddUserToChat
	| RemoveUserFromChat
	| ResetOpenedUserInChat
	| SelectUserInChat
    | UnSelectUserInChat
    | MuteUser
    | UnMuteUser;

export default Action;

type ClickPageNav = {
	type: 'UI::navigation::pageNavIndex::<set>';
	payload: PLIndex<0 | 1 | 2>;
};

type ClickSettingNav = {
	type: 'UI::settingDialog::navIndex::<set>';
	payload: PLIndex<0 | 1>;
};

type ToggleSettingDialog = {
	type: 'UI::settingDialog::open::<toggle>';
	payload: PLToggle;
};

type UpdateTempSetting = {
	type: 'UI::settingDialog::settingChanges::<update>';
	payload: Partial<SettingType>;
};

type UpdateTempTheme = {
	type: 'UI::settingDialog::themeChanges::<update>';
	payload: Partial<ThemeType>;
};

type UpdateSetting = {
	type: 'DATA::config::setting::<update>';
	payload: Partial<SettingType>;
};

type UpdateTheme = {
	type: 'DATA::config::theme::<update>';
	payload: Partial<ThemeType>;
};

type CleanTempSettModi = {
	type: 'UI::settingDialog::tempConfig::<reset>';
};

type AddUserToUsers = {
	type: 'DATA::users::<add>';
	payload: UserType;
};

type AddUserToContact = {
	type: 'DATA::contact::users::<add>';
	payload: PLUserId;
};

type OpenUserInChat = {
	type: 'UI::chat::openedUser::<set>';
	payload: PLUserId;
};

type AddUserToChat = {
	type: 'DATA::chat::users::<add>';
	payload: PLUserId;
};

type RemoveUserFromChat = {
	type: 'DATA::chat::users::<remove>';
	payload: PLUserId;
};

type ResetOpenedUserInChat = {
	type: 'UI::chat::openedUser::<reset>';
};

type SelectUserInChat = {
	type: 'UI::chat::selectedUsers::<add>';
	payload: PLUserId;
};

type UnSelectUserInChat = {
	type: 'UI::chat::selectedUsers::<remove>';
	payload: PLUserId;
};

type MuteUser = {
	type: 'DATA::contact::mutedUsers::<add>';
	payload: PLUserId;
};

type UnMuteUser = {
	type: 'DATA::contact::mutedUsers::<remove>';
	payload: PLUserId;
};
