import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import CSS from '../../../../css';
import Icon from '../../../globalComps/Icon';
import { NAMES } from '../../../globalComps/Icon';

type Props = {
	name: NAMES;
	opened?: boolean;
	text: string;
	onClick: () => any;
};

const OptPanel: React.FC<Props> = (props: Props) => {
	const { name, opened, text, onClick } = props;
	let colorBase = opened ? '255,255,255' : undefined;
	return (
		<Tooltip title={text}>
			<IconButton style={CSS.padding({ all: '6px' })} onClick={onClick}>
				<Icon name={name} fontSize="small" nativeColor={CSS.trans(0.75, colorBase)} />
			</IconButton>
		</Tooltip>
	);
};

export default OptPanel;
