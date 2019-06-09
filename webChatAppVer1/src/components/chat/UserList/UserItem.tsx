import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import UserType from '../../../redux/types/userType';
import CSS from '../../../css';
import Context from '../../../context/Context';
import ThemeType from '../../../redux/types/themeType';
import OptPanel from './OptPanel/OptPanel';
import Icon from '../../globalComps/Icon';

type Props = {
	user: UserType;
	opened: boolean;
	onClick: () => any;
	muted: boolean;
	toggleMute: (prev: boolean) => any;
	selected: boolean;
	toggleSelect: (prev: boolean) => any;
	markReaded: () => any;
	onRemove: () => any;
	globalMode: boolean;
	msg: string;
	unreadCount: number | undefined;
	timeStamp: string;
};

type State = {
	elevation: number;
	removePrompt: boolean;
};

export default class UserItem extends React.Component<Props, State> {
	static contextType = Context;
	state: State = {
		elevation: 0,
		removePrompt: false
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
		this.setState({
			removePrompt: false
		});
		event.preventDefault();
		toggleSelect(selected);
	};

	toggleRemovePrompt = () =>
		this.setState((prev: State) => ({
			removePrompt: !prev.removePrompt
		}));

	render() {
		const {
			onClick,
			user,
			opened,
			muted,
			toggleMute,
			selected,
			globalMode,
			onRemove,
			msg,
			unreadCount,
			timeStamp,
			markReaded
		} = this.props;
		const { elevation, removePrompt } = this.state;
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
				elevation={selected ? 5 : elevation}
			>
				<ListItem
					onClick={onClick}
					style={CSS.multi({
						padding: { all: '8px' },
						pointer: true
					})}
					onContextMenu={this.onRightClick}
				>
					<ListItemAvatar>
						<Avatar alt={name} src={avatar ? avatar : 'src/image/DEFAULT_AVATAR.png'} />
					</ListItemAvatar>
					<ListItemText
						primary={
							<React.Fragment>
								{name}
								<span
									style={CSS.multi({
										float: 'right',
										font: { color: CSS.trans(0.5, txtColorBase) }
									})}
								>
									{timeStamp}
								</span>
							</React.Fragment>
						}
						primaryTypographyProps={{
							style: CSS.toggleColor({ toggle: opened, color: 'white' })
						}}
						secondary={
							<React.Fragment>
								{msg}
								<Zoom in={unreadCount !== undefined}>
									<span
										style={CSS.multi({
											float: 'right',
											font: { color: CSS.trans(0.5, txtColorBase) },
											margin: { left: '3px' }
										})}
									>
										{unreadCount}
									</span>
								</Zoom>
								<Tooltip title="muted">
									<Zoom in={muted}>
										<Icon
											name="notif_mute"
											fontSize="small"
											nativeColor={CSS.trans(0.5, txtColorBase)}
											style={CSS.float('right')}
										/>
									</Zoom>
								</Tooltip>
							</React.Fragment>
						}
						secondaryTypographyProps={{
							style: CSS.font({
								color: CSS.trans(0.25, txtColorBase),
								size: '0.875rem',
								weight: 400
							})
						}}
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
						markReaded={markReaded}
						toggleRP={this.toggleRemovePrompt}
						removePrompt={removePrompt}
					/>
				</Collapse>
			</Paper>
		);
	}
}
