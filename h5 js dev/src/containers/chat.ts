/**
 * Container components
 * See rep components at src\components\chat\Chat.tsx
 */
import { connect } from 'react-redux';

import { State } from '../redux/types/stateType';
import Dispatch from '../redux/types/dispatchType';
import Chat from '../components/chat/Chat';

const mapStateToProps = (state: State) => {
	const { openedUser, filterMode, selectedUsers } = state.chat;
	const { users, mutedUsers } = state.contact;
	return {
		userListPropsState: {
			users: state.users,
			chatUsers: state.chat.users,
			mutedUsers: mutedUsers,
			selectedUsers: selectedUsers
		},
		filterData: {
			filterMode: filterMode
		},
		contacts: users,
		openedUser: openedUser
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	userListPropsFunc: {
		setOpenedUser: (id: string) =>
			dispatch({
				type: 'UI::chat::openedUser::<set>',
				payload: { id: id }
			}),
		muteUser: (id: string, mutedUsers: string[]) => {
			if (mutedUsers.indexOf(id) === -1) {
				dispatch({
					type: 'DATA::contact::mutedUsers::<add>',
					payload: { id: id }
				});
			}
		},
		unMuteUser: (id: string, mutedUsers: string[]) => {
			if (mutedUsers.indexOf(id) > -1) {
				dispatch({
					type: 'DATA::contact::mutedUsers::<remove>',
					payload: { id: id }
				});
			}
		},
		selectUser: (id: string, selectedUsers: string[]) => {
			if (selectedUsers.indexOf(id) === -1) {
				dispatch({
					type: 'UI::chat::selectedUsers::<add>',
					payload: { id: id }
				});
			}
		},
		unSelectUser: (id: string, selectedUsers: string[]) => {
			if (selectedUsers.indexOf(id) > -1) {
				dispatch({
					type: 'UI::chat::selectedUsers::<remove>',
					payload: { id: id }
				});
			}
		},
		resetOpenedUser: () =>
			dispatch({
				type: 'UI::chat::openedUser::<reset>'
			}),
		removeUser: (id: string, openedUser: string, selectedUsers: string[]) => {
			if (openedUser === id) {
				dispatch({
					type: 'UI::chat::openedUser::<reset>'
				});
			}
			if (selectedUsers.indexOf(id) > -1) {
				dispatch({
					type: 'UI::chat::selectedUsers::<remove>',
					payload: { id: id }
				});
			}
			dispatch({
				type: 'DATA::chat::users::<remove>',
				payload: { id: id }
			});
		}
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
