import * as React from 'react';

import CSS from '../../../../css';
import OptIcon from './OptIcon';

type Props = {
	opened: boolean;
	mute: boolean;
	toggleMute: (prev: boolean) => any;
	onRemove: () => any;
	onRightClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
	markReaded: () => any;
	toggleRP: () => any;
	removePrompt: boolean;
};

const OptPanel: React.FC<Props> = (props: Props) => {
	const { opened, mute, toggleMute, onRemove, onRightClick, markReaded, toggleRP, removePrompt } = props;
	return (
		<div
			style={CSS.multi({
				bg: CSS.trans(removePrompt ? 0.15 : 0.05),
				roundEdgePanel: '15px',
				padding: { all: '6px' },
				transition: 0.3
			})}
			onContextMenu={onRightClick}
		>
			{removePrompt ? (
				<React.Fragment>
					<OptIcon name="check" text="confirm" onClick={onRemove} opened={opened} />
					<OptIcon name="x" text="cancel" onClick={toggleRP} opened={opened} />
				</React.Fragment>
			) : (
				<React.Fragment>
					<OptIcon name="delete" text="delete" onClick={toggleRP} opened={opened} />
					<OptIcon
						name={mute ? 'notif_alarm' : 'notif_mute'}
						text={mute ? 'unmute' : 'mute'}
						onClick={() => toggleMute(mute)}
						opened={opened}
					/>
					<OptIcon name="check_circle" text="mark as read" onClick={markReaded} opened={opened} />
				</React.Fragment>
			)}
		</div>
	);
};

export default OptPanel;
