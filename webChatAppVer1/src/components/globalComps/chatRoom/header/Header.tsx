import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CSS from '../../../../css';
import UserType from '../../../../redux/types/userType';
import Actions from './Actions';

type Props = {
	user: UserType;
};

const Header: React.FC<Props> = (props: Props) => {
	const { user } = props;
	return (
		<Grid container style={{ width: '100%', height: '12%' }}>
			<Paper
				elevation={1}
				style={{
					display: 'flex',
					alignItems: 'center',
					height: '100%',
					width: '100%'
				}}
				square
			>
				<Grid item xs={3} style={{ marginLeft: '16px' }}>
					<Typography variant="h3">{user.name}</Typography>
				</Grid>
				<Grid item xs={6} />
				<Grid item xs={3} style={{ marginRight: '16px', textAlign: 'right' }}>
					<Actions />
				</Grid>
			</Paper>
		</Grid>
	);
};

export default Header;
