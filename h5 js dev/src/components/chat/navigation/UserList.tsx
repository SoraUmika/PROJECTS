import * as React from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

import * as P from '../props';
import UserItem from './UserItem';
import OptPanelG from './OptPanel/OptPanelG';

type Props = {
	openedUser: string;
} & P.FilterData &
	P.UserList;

const UserList: React.FC<Props> = (props: Props) => {
	const {
		chatUsers,
		setOpenedUser,
		users,
		openedUser,
		mutedUsers,
		muteUser,
		unMuteUser,
		selectedUsers,
		selectUser,
		unSelectUser,
		resetOpenedUser,
		removeUser
	} = props;
	const allAction = (act: (id: string) => any) => {
		for (let i in chatUsers) {
			act(chatUsers[i]);
		}
	};
	const selectAction = (act: (id: string) => any) => {
		for (let i in selectedUsers) {
			act(selectedUsers[i]);
		}
	};
	let globalMode = selectedUsers.length > 1;
	return (
		<React.Fragment>
			<Collapse in={globalMode}>
				<OptPanelG
					muteAll={() => selectAction((id: string) => muteUser(id, mutedUsers))}
					unMuteAll={() => selectAction((id: string) => unMuteUser(id, mutedUsers))}
					onRemove={() => selectAction((id: string) => removeUser(id, openedUser, selectedUsers))}
					selectAll={() => allAction((id: string) => selectUser(id, selectedUsers))}
					unSelectAll={() => allAction((id: string) => unSelectUser(id, selectedUsers))}
					selectCount={selectedUsers.length}
				/>
			</Collapse>
			<List disablePadding>
				{chatUsers.map((id, index) => {
					return (
						<UserItem
							user={users[id]}
							opened={id === openedUser}
							onClick={() => setOpenedUser(id)}
							key={index}
							muted={mutedUsers.indexOf(id) > -1}
							toggleMute={(prev: boolean) =>
								prev ? unMuteUser(id, mutedUsers) : muteUser(id, mutedUsers)}
							selected={selectedUsers.indexOf(id) > -1}
							toggleSelect={(prev: boolean) =>
								prev ? unSelectUser(id, selectedUsers) : selectUser(id, selectedUsers)}
							onRemove={() => removeUser(id, openedUser, selectedUsers)}
							globalMode={globalMode}
						/>
					);
				})}
			</List>
		</React.Fragment>
	);
};

export default UserList;
