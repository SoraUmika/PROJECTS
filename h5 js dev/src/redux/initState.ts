import { State } from './types/stateType';

const INIT_STATE: State = {
	chat: {
		openedUser: 'b',
		users: [ 'a', 'b', 'c' ],
		nameFilter: '',
		filterMode: 'all',
		selectedUsers: []
	},
	contact: {
		users: [ 'a', 'b', 'c' ],
		mutedUsers: []
	},
	room: {},
	header: {},
	navigation: {
		pageNavindex: 0
	},
	settingDialog: {
		open: false,
		navIndex: 0,
		isModified: false,
		settingChanges: {},
		themeChanges: {}
	},
	config: {
		setting: {
			test: false
		},
		theme: {
			colorMain: '#1a73e8',
			transMain: '#4285f426',
			colorBgPrime: '#f3f3f3',
			colorBgSecond: '#f9f9f9'
		}
	},
	users: {
		a: {
			name: 'name1',
			id: 'a',
			avatar: null
		},
		b: {
			name: 'name2',
			id: 'b',
			avatar: null
		},
		c: {
			name: 'name3',
			id: 'c',
			avatar: null
		},
		abcd: {
			name: 'account name',
			id: 'abcd',
			avatar: null
		}
	},
	account: {
		user: 'abcd'
	}
};

export default INIT_STATE;
