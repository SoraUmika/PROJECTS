import { Chat } from '../types/stateType';
import Action from '../types/actionTypes';
import { merge, remove } from './tool/toolFuncs';

export default function reducer(state: Chat, action: Action): Chat {
	switch (action.type) {
		case 'DATA::chat::users::<add>':
			return merge(state, {
				users: [ ...state.users, action.payload.id ]
			});
		case 'DATA::chat::users::<remove>':
			return merge(state, {
				users: remove(state.users, action.payload.id)
			});
		case 'UI::chat::openedUser::<set>':
			return merge(state, {
				openedUser: action.payload.id
			});
		case 'UI::chat::openedUser::<reset>':
			return merge(state, {
				openedUser: null
			});
		case 'UI::chat::selectedUsers::<add>':
			return merge(state, {
				selectedUsers: [ ...state.selectedUsers, action.payload.id ]
			});
		case 'UI::chat::selectedUsers::<remove>':
			return merge(state, {
				selectedUsers: remove(state.selectedUsers, action.payload.id)
			});
		default:
			return state;
	}
}
