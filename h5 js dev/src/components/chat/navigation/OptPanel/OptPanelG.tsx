import * as React from 'react';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';

import CSS from '../../../../css';
import OptIcon from './OptIcon';

type Props = {
	muteAll: () => any;
	unMuteAll: () => any;
	onRemove: () => any;
	selectCount: number;
	selectAll: () => any;
	unSelectAll: () => any;
};

const OptPanel: React.FC<Props> = (props: Props) => {
	const { muteAll, unMuteAll, onRemove, selectCount, selectAll, unSelectAll } = props;
	return (
		<Grid container style={CSS.multi({ bg: CSS.trans(0.05), padding: { all: '6px' } })}>
			<Grid item xs>
				<OptIcon name="delete" text="delete" onClick={onRemove} />
				<OptIcon name="notif_mute" text="mute" onClick={muteAll} />
				<OptIcon name="notif_alarm" text="unmute" onClick={unMuteAll} />
				<OptIcon name="check" text="mark as read" onClick={() => null} />
			</Grid>
			<Grid item xs>
				<div style={CSS.float('right')}>
					<Badge badgeContent={selectCount} style={CSS.margin({ all: '15px' })} color="primary">
						<div />
					</Badge>
					<OptIcon name="check_all" text="check all" onClick={selectAll} />
					<OptIcon name="check_empty" text="un-check all" onClick={unSelectAll} />
				</div>
			</Grid>
		</Grid>
	);
};

export default OptPanel;
