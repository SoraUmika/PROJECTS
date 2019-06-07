import Action from '../types/actionTypes';
import { merge } from './tool/toolFuncs';
import { Users } from '../../types';

export default function reducer(state: Users, action: Action): Users {
	switch (action.type) {
		case 'DATA::users::<add>':
			const id = action.payload.id;
			const copy = merge(state, {});
			copy[id] = action.payload;
			return copy;
		default:
			return state;
	}
}
