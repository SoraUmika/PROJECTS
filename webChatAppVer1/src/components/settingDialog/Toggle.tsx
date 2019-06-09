import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
	text: string;
	handeler: (bool: boolean) => void;
	checked: boolean;
}

const Toggle: React.FC<Props> = (props) => {
	const { text, handeler, checked } = props;
	return (
		<ListItem>
			<ListItemText primary={text} />
			<ListItemSecondaryAction>
				<Switch onChange={() => handeler(checked)} checked={checked} />
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default Toggle;
