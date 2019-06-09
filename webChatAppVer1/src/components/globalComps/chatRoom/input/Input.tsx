import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import CSS from '../../../../css';

type Props = {};

const Input: React.FC<Props> = (props: Props) => {
	return (
		<div style={CSS.multi({ fullW: true, size: { height: '10%' } })}>
			<Paper />
		</div>
	);
};

export default Input;
