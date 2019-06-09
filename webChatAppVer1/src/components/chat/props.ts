import Action from '../../redux/types/actionTypes';
import { ChatFilterModes, Users, StringObject } from '../../types';

export type FilterData = {
	filterMode: ChatFilterModes;
};

export type UserListFunc = {
	setOpenedUser: (id: string) => Action;
	muteUser: (id: string, mutedUsers: string[]) => void;
	unMuteUser: (id: string, mutedUsers: string[]) => void;
	selectUser: (id: string, selectedUsers: string[]) => void;
	unSelectUser: (id: string, selectedUsers: string[]) => void;
	resetOpenedUser: () => Action;
	removeUser: (id: string, openedUser: string, selectedUsers: string[]) => void;
	resetUnReadCounter: (id: string, unReadCounts: StringObject<number>) => Action;
};

export type UserListState = {
	chatUsers: string[];
	users: Users;
	mutedUsers: string[];
	selectedUsers: string[];
	unReadCount: StringObject<number>;
};

export type UserList = UserListFunc & UserListState;
