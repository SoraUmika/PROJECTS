import * as React from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import * as P from '../props';
import UserItem from './UserItem';
import OptPanelG from './OptPanel/OptPanelG';
import Icon, { NAMES } from '../../globalComps/Icon';
import CSS from '../../../css';
import NoData from '../../globalComps/NoData';

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
		removeUser,
		unReadCount,
		resetUnReadCounter
	} = props;

	const val = React.useState(false);
	const [ removePrompt, setRemovePrompt ] = val;
	const [ menuOpen, setMenuOpen ] = React.useState(false);
	const globalMode = selectedUsers.length > 1;

	const toggleRP = () => setRemovePrompt(!removePrompt);
	const all = (act: (id: string, ...other: any[]) => any, ...other: any[]) => {
		for (let i in chatUsers) {
			act(chatUsers[i], ...other);
		}
	};
	const select = (act: (id: string, ...other: any[]) => any, ...other: any[]) => {
		for (let i in selectedUsers) {
			act(selectedUsers[i], ...other);
		}
	};
	const menuItems: { icon: NAMES; text: string; act: () => any }[] = [
		{ icon: 'check_all', text: 'select all', act: () => all(selectUser, selectedUsers) },
		{ icon: 'check_circle', text: 'mark all as readed', act: () => all(resetUnReadCounter, unReadCount) }
	];

	return (
		<React.Fragment>
			<Collapse in={globalMode}>
				<OptPanelG
					muteAll={() => select(muteUser, mutedUsers)}
					unMuteAll={() => select(unMuteUser, mutedUsers)}
					onRemove={() => select(removeUser, openedUser, selectedUsers)}
					selectAll={() => all(selectUser, selectedUsers)}
					unSelectAll={() => all(unSelectUser, selectedUsers)}
					markAllReaded={() => select(resetUnReadCounter, unReadCount)}
					selectCount={selectedUsers.length}
					removePrompt={removePrompt}
					toggleRP={toggleRP}
				/>
			</Collapse>
			<List disablePadding>
				{chatUsers.map((id, index) => {
					const user = users[id];
					return (
						<UserItem
							user={user}
							opened={id === openedUser}
							onClick={() => {
								setOpenedUser(id);
								resetUnReadCounter(id, unReadCount);
							}}
							key={index}
							muted={mutedUsers.indexOf(id) > -1}
							toggleMute={(prev: boolean) =>
								prev ? unMuteUser(id, mutedUsers) : muteUser(id, mutedUsers)}
							selected={selectedUsers.indexOf(id) > -1}
							toggleSelect={(prev: boolean) =>
								prev ? unSelectUser(id, selectedUsers) : selectUser(id, selectedUsers)}
							onRemove={() => removeUser(id, openedUser, selectedUsers)}
							globalMode={globalMode}
							msg={user.msg.length > 0 ? user.msg[0].data.txt : 'NULL'}
							unreadCount={unReadCount[id]}
							timeStamp="now"
							markReaded={() => resetUnReadCounter(id, unReadCount)}
						/>
					);
				})}
			</List>
			{chatUsers.length === 0 && <NoData />}
			<IconButton
				style={CSS.multi({
					absolute: true,
					pos: { bottom: '0px' },
					margin: { left: '16px', bottom: '16px', top: '8px', right: '8px' },
					zIndex: 2
				})}
				onMouseEnter={() => setMenuOpen(true)}
				color={menuOpen ? 'primary' : undefined}
				disableRipple
			>
				<Icon name="menu" />
			</IconButton>
			<Popper
				open={menuOpen}
				transition
				disablePortal
				style={CSS.multi({
					absolute: true,
					pos: { bottom: '0px' },
					margin: { all: '8px' },
					zIndex: 1
				})}
				onMouseLeave={() => setMenuOpen(false)}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
					>
						<Paper>
							<MenuList style={CSS.padding({ bottom: '64px' })}>
								{menuItems.map(({ icon, text, act }) => (
									<MenuItem onClick={act} key={text} style={CSS.padding({ left: '20px' })}>
										<ListItemIcon>
											<Icon name={icon} />
										</ListItemIcon>
										<ListItemText primary={text} />
									</MenuItem>
								))}
							</MenuList>
						</Paper>
					</Grow>
				)}
			</Popper>
		</React.Fragment>
	);
};

export default UserList;
