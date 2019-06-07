/**
 * Master Component.
 * See container Component at src\containers\header.ts
 */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import System from './System/System';
import CSS from '../../css';
import * as P from './props';

type Props = {
	systemState: P.SystemState;
	systemFunc: P.SystemFunc;
};

const Header: React.FC<Props> = (props) => {
	const { systemFunc, systemState } = props;
	return (
		<React.Fragment>
			<Paper style={CSS.appBar} square elevation={3}>
				<Grid item xs={3} />
				<Grid item xs={6} />
				<Grid item xs={3}>
					<System {...systemFunc} {...systemState} />
				</Grid>
			</Paper>
		</React.Fragment>
	);
};

export default Header;
