import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import rHeader from './reducers/header';
import rSettingDialog from './reducers/settingDialog';
import rConfig from './reducers/config';
import rUsers from './reducers/users';
import rChat from './reducers/chat';
import rContact from './reducers/contact';
import rAccount from './reducers/account';
import rNavigation from "./reducers/navigation";

import Action from './types/actionTypes';
import * as ST from './types/stateType';
import INIT_STATE from './initState';

function reducer(state: ST.State = INIT_STATE, action: Action): ST.State {
	return {
		chat: rChat(state.chat, action),
		contact: rContact(state.contact, action),
		room: {},
		header: rHeader(state.header, action),
		navigation: rNavigation(state.navigation, action),
		settingDialog: rSettingDialog(state.settingDialog, action, state.config),
		config: rConfig(state.config, action),
		users: rUsers(state.users, action),
		account: rAccount(state.account, action)
	};
}

const store = createStore<ST.State, Action, {}, {}>(reducer, devToolsEnhancer({}));
export default store;
