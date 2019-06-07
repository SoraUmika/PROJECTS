import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

import UserType from '../../../redux/types/userType';
import CSS from '../../../css';
import Context from '../../../context/Context';
import ThemeType from '../../../redux/types/themeType';
import OptPanel from './OptPanel/OptPanel';

type Props = {
	user: UserType;
	opened: boolean;
	onClick: () => any;
	muted: boolean;
	toggleMute: (prev: boolean) => any;
	selected: boolean;
	toggleSelect: (prev: boolean) => any;
	onRemove: () => any;
	globalMode: boolean;
};

type State = {
	elevation: number;
};

export default class UserItem extends React.Component<Props, State> {
	static contextType = Context;
	state: State = {
		elevation: 0
	};
	enableTransition: boolean = false;

	onEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		this.setState({ elevation: 3 });
		this.enableTransition = true;
	};

	onLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		this.setState({ elevation: 0 });
		this.enableTransition = true;
	};

	onRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const { toggleSelect, selected } = this.props;
		event.preventDefault();
		toggleSelect(selected);
	};

	render() {
		const { onClick, user, opened, muted, toggleMute, selected, globalMode, onRemove, toggleSelect } = this.props;
		const { elevation } = this.state;
		const { name, avatar } = user;
		const txtColorBase = opened ? '255,255,255' : '0,0,0';
		const theme: ThemeType = this.context.theme;
		let transition: number = this.enableTransition ? 0.5 : undefined;
		this.enableTransition = false;
		return (
			<Paper
				style={CSS.multi({
					margin: { all: '8px' },
					bg: theme.colorBgSecond,
					toggleBg: { toggle: opened, color: theme.colorMain },
					roundEdge: '15px',
					transition: transition
				})}
				onMouseEnter={this.onEnter}
				onMouseLeave={this.onLeave}
				elevation={selected ? 4 : elevation}
			>
				<ListItem
					onClick={onClick}
					style={CSS.multi({
						padding: { all: '8px' },
						pointer: true
						// toggleBg: { toggle: globalMode && selected, color: CSS.trans(0.2) },
						// roundEdge: '15px'
					})}
					onContextMenu={this.onRightClick}
				>
					<ListItemAvatar>
						<Avatar alt={name} src={avatar ? avatar : 'src/image/DEFAULT_AVATAR.png'} />
					</ListItemAvatar>
					<ListItemText
						primary={name}
						primaryTypographyProps={{
							style: CSS.toggleColor({ toggle: opened, color: 'rgb(255,255,255)' })
						}}
						secondary={
							<Typography
								style={CSS.font({
									color: CSS.trans(0.25, txtColorBase),
									size: '0.875rem',
									weight: 400
								})}
							>
								Hi
							</Typography>
						}
					/>
					<ListItemText
						primary={
							<Typography
								style={CSS.font({
									color: CSS.trans(0.5, txtColorBase),
									size: '0.875rem',
									weight: 400
								})}
							>
								now
							</Typography>
						}
						secondary={<Typography style={CSS.font({ color: CSS.trans(0) })}>test</Typography>}
						style={CSS.multi({
							size: { width: '45px' },
							padding: { right: '0px' },
							absolute: true,
							pos: { right: '16px' }
						})}
					/>
				</ListItem>
				<Collapse in={selected && !globalMode}>
					<OptPanel
						opened={opened}
						mute={muted}
						toggleMute={toggleMute}
						onRemove={onRemove}
						onRightClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
							this.onRightClick(event);
							this.onLeave(event);
						}}
					/>
				</Collapse>
			</Paper>
		);
	}
}
