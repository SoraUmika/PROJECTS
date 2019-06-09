import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import CSS from '../../css';
import Context from '../../context/Context';
import ThemeType from '../../redux/types/themeType';
import Icon from './Icon';
import { NAMES } from './Icon';

type Props = {
	select?: boolean;
	text: string;
	icon: NAMES;
	onClick: (index: number) => any;
	id: number;
	style?: React.CSSProperties;
};

type State = {
	hover: boolean;
};

export default class NavItem extends React.Component<Props, State> {
	static contextType = Context;
	state: State = {
		hover: false
	};

	onEnter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		this.setState({ hover: true });
	};

	onLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		this.setState({ hover: false });
	};

	render() {
		const { select, text, icon, onClick, id, style} = this.props;
		const { hover } = this.state;
		const theme: ThemeType = this.context.theme;
		const color = select ? 'primary' : undefined;
		return (
			<ListItem
				onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => onClick(id)}
				onMouseEnter={this.onEnter}
				onMouseLeave={this.onLeave}
				style={CSS.multi(
					{
						toggleBg: { toggle: hover, color: theme.transMain },
						pointer: hover
					},
					style
				)}
			>
				<Zoom in={select}>
					<div style={CSS.indicator({ toggle: select, color: theme.colorMain })} />
				</Zoom>
				<ListItemIcon>
					<Icon name={icon} color={color} />
				</ListItemIcon>
				<ListItemText primary={<Typography color={color}>{text}</Typography>} />
			</ListItem>
		);
	}
}
