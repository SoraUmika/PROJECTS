import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';

import Icon from '../../globalComps/Icon';
import SettingDialog from '../../../containers/settingDialog';
import CSS from '../../../css';
import * as P from '../props';
import SysIcon from "./SysIcon";

type Props = P.SystemFunc & P.SystemState;

const System: React.FC<Props> = (props: Props) => {
	const { settDialogOpen, closeSettDialog, openSettDialog } = props;
	return (
		<div style={CSS.float('right')}>
			<SysIcon onClick={openSettDialog}>
				<Icon name="setting" />
			</SysIcon>
			<SysIcon onClick={() => null} style={CSS.margin({ right: '16px' })}>
				<Badge color="primary" badgeContent={1}>
					<Icon name="notif" />
				</Badge>
			</SysIcon>
			<ButtonBase
				style={CSS.multi({
					roundEdge: '50%',
					margin: { right: '16px' }
				})}
			>
				<Badge variant="dot">
					<Avatar alt="Avatar" src="src/image/DEFAULT_AVATAR.png" />
				</Badge>
			</ButtonBase>

			<SettingDialog open={settDialogOpen} on_close={closeSettDialog} />
		</div>
	);
};

export default System;
