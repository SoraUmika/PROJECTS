import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from './Icon';
import CSS from '../../css';

const NoData: React.FC<{}> = (props: any) => {
	return (
		<div style={CSS.multi({ font: { align: 'center' }, margin: { top: '50%' } })}>
			<Typography variant="title">No data available</Typography>
			<Icon name="data" fontSize="large"/>
		</div>
	);
};

export default NoData;
