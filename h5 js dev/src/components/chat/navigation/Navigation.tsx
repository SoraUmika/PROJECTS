import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import UserList from './UserList';
import * as P from '../props';

type Props = {
	filterData: P.FilterData;
	userListProps: P.UserList;
	openedUser: string;
};

const Navigation: React.FC<Props> = (props) => {
	const { filterData, userListProps, openedUser } = props;
	return (
		<Grid container>
			<Grid item xs={12} />
			<Grid item xs={12}>
				<UserList
					{...filterData}
					{...userListProps}
					openedUser={openedUser}
				/>
			</Grid>
		</Grid>
	);
};

export default Navigation;
