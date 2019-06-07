/**
 * Account section at left section of the header.
 */
import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';

import CSS from '../../css';

const Account: React.FC<{}> = (props) => {
	return (
		<div>
			<Badge variant="dot" style={CSS.float('left')}>
				<Avatar
					alt="Avatar"
					src="src/image/DEFAULT_AVATAR.png"
					style={CSS.size({ width: '44px', height: '44px' })}
				/>
			</Badge>
			<ListItemText primary="UserName" secondary="UserID" style={CSS.float('left')} />
		</div>
	);
};

export default Account;
