import { Contact } from '../types/stateType';
import Action from '../types/actionTypes';
import { merge, remove } from './tool/toolFuncs';

export default function reducer(state: Contact, action: Action): Contact {
	switch (action.type) {
		case 'DATA::contact::users::<add>':
			return merge(state, {
				users: [ ...state.users, action.payload.id ]
			});
		case 'DATA::contact::mutedUsers::<add>':
			return merge(state, {
				mutedUsers: [ ...state.mutedUsers, action.payload.id ]
			});
		case 'DATA::contact::mutedUsers::<remove>':
			return merge(state, {
				mutedUsers: remove(state.mutedUsers, action.payload.id)
			});
		default:
			return state;
	}
}
