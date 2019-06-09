import { State } from './types/stateType';

const INIT_STATE: State = {
	chat: {
		openedUser: null,
		users: [ 'a', 'b', 'c' ],
		nameFilter: '',
		filterMode: 'all',
		selectedUsers: []
	},
	contact: {
		users: [ 'a', 'b', 'c' ],
		mutedUsers: [],
		unReadCount: {
			'a': 1,
			'b': 2,
			'c': 3
		}
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
			avatar: null,
			msg: [
				{
					type: 'text',
					src: 'other',
					data: {
						txt: 'text msg'
					}
				}
			]
		},
		b: {
			name: 'name2',
			id: 'b',
			avatar: null,
			msg: [
				{
					type: 'text',
					src: 'other',
					data: {
						txt: 'text msg'
					}
				}
			]
		},
		c: {
			name: 'name3',
			id: 'c',
			avatar: null,
			msg: [
				{
					type: 'text',
					src: 'other',
					data: {
						txt: 'text msg'
					}
				}
			]
		},
		abcd: {
			name: 'account name',
			id: 'abcd',
			avatar: null,
			msg: []
		}
	},
	account: {
		user: 'abcd'
	}
};

export default INIT_STATE;
