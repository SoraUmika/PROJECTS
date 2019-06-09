import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';

import Icon from '../../Icon';
import CSS from '../../../../css';

type Props = {};

const Actions: React.FC<Props> = (props: Props) => {
	return (
		<React.Fragment>
			<IconButton>
				<Icon name="account" />
			</IconButton>
		</React.Fragment>
	);
};

export default Actions;
