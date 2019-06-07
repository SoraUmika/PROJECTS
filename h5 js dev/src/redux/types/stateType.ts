import SettingType from './settingType';
import ThemeType from './themeType';
import { Nullable, ChatFilterModes, Users } from '../../types';

export type State = {
	chat: Chat;
	contact: Contact;
	room: Room;
	header: Header;
	navigation: Navigation;
	settingDialog: SettingDialog;
	config: Config;
	users: Users;
	account: Account;
};

export type Chat = {
	openedUser: Nullable<string>;
	users: string[];
	nameFilter: string;
	filterMode: ChatFilterModes;
	selectedUsers: string[];
};

export type Contact = {
	users: string[];
	mutedUsers: string[];
};

export type Room = {};

export type Header = {
};

export type Navigation = {
	pageNavindex: 0 | 1 | 2;
}

export type SettingDialog = {
	open: boolean;
	navIndex: 0 | 1;
	isModified: boolean;
	settingChanges: Partial<SettingType>;
	themeChanges: Partial<ThemeType>;
};

export type Config = {
	setting: SettingType;
	theme: ThemeType;
};

export type Account = {
	user: string;
};