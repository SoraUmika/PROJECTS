/**
 * Master Component.
 */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Pages from '../globalComps/Pages';
import { Nullable } from '../../types';
import * as P from './props';
import CSS from '../../css';
import Context from '../../context/Context';
import ThemeType from '../../redux/types/themeType';
import UserList from './UserList/UserList';
import NoData from '../globalComps/NoData';
import ChatRoom from '../globalComps/chatRoom/ChatRoom';

type Props = {
	openedUser: Nullable<string>;
	contacts: string[];
	filterData: P.FilterData;
	userListPropsState: P.UserListState;
	userListPropsFunc: P.UserListFunc;
};

export default class Chat extends React.Component<Props, {}> {
	static contextType = Context;

	render() {
		const { filterData, userListPropsFunc, userListPropsState, openedUser } = this.props;
		const theme: ThemeType = this.context.theme;
		return (
			<React.Fragment>
				<Grid item container xs={3}>
					<Paper square style={CSS.multi({ fullW: true, bg: theme.colorBgSecond })} elevation={1}>
						<UserList
							{...filterData}
							{...userListPropsFunc}
							{...userListPropsState}
							openedUser={openedUser}
						/>
					</Paper>
				</Grid>
				<Grid item container xs={9}>
					<Paper square elevation={1} style={CSS.fullW}>
						{openedUser && <ChatRoom user={userListPropsState.users[openedUser]}/>}
						{/* <Pages items={[ <ChatRoom user={userListPropsState.users[openedUser]}/> ]} index={0} /> */}
					</Paper>
				</Grid>
			</React.Fragment>
		);
	}
}
