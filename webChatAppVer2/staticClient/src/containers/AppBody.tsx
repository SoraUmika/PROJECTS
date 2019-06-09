import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import jss from '../jss';

const ROOT = jss('app-body', {
	'': {
		height: '90%'
	}
});

type Props = {};

const AppBody: React.FC<Props> = (props) => {
	return (
		<Grid container spacing={0} className={ROOT}>
			<Grid item xs={2} />
			<Grid item xs={10} />
		</Grid>
	);
};

export default AppBody;
