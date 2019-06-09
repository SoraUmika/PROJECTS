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
	markAllReaded: () => any;
	toggleRP?: () => any;
	removePrompt?: boolean;
};

const OptPanel: React.FC<Props> = (props: Props) => {
	const {
		muteAll,
		unMuteAll,
		onRemove,
		selectCount,
		selectAll,
		unSelectAll,
		markAllReaded,
		removePrompt,
		toggleRP
	} = props;
	return (
		<Grid
			container
			style={CSS.multi({
				bg: CSS.trans(removePrompt ? 0.15 : 0.05),
				padding: { all: '6px' },
				transition: 0.3
			})}
		>
			<Grid item xs>
				{removePrompt ? (
					<React.Fragment>
						<OptIcon name="check" text="confirm" onClick={onRemove} />
						<OptIcon name="x" text="cancel" onClick={toggleRP} />
					</React.Fragment>
				) : (
					<React.Fragment>
						<OptIcon name="delete" text="delete" onClick={toggleRP} />
						<OptIcon name="notif_mute" text="mute" onClick={muteAll} />
						<OptIcon name="notif_alarm" text="unmute" onClick={unMuteAll} />
						<OptIcon name="check_circle" text="mark as read" onClick={markAllReaded} />
					</React.Fragment>
				)}
			</Grid>
			<Grid item xs>
				<div style={CSS.float('right')}>
					<Badge badgeContent={selectCount} style={CSS.margin({ all: '15px' })} color="primary">
						<div />
					</Badge>
					<OptIcon name="check_all" text="check all" onClick={selectAll} />
					<OptIcon name="x" text="cancel" onClick={unSelectAll} />
				</div>
			</Grid>
		</Grid>
	);
};

export default OptPanel;
