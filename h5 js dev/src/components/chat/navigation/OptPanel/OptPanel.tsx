import * as React from 'react';

import CSS from '../../../../css';
import OptIcon from './OptIcon';

type Props = {
	opened: boolean;
	mute: boolean;
	toggleMute: (prev: boolean) => any;
	onRemove: () => any;
	onRightClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
};

const OptPanel: React.FC<Props> = (props: Props) => {
	const { opened, mute, toggleMute, onRemove, onRightClick } = props;
	return (
		<div
			style={CSS.multi({ bg: CSS.trans(0.05), roundEdgePanel: "15px", padding: { all: '6px' } })}
			onContextMenu={onRightClick}
		>
			<OptIcon name="delete" text="delete" onClick={onRemove} opened={opened} />
			<OptIcon
				name={mute ? 'notif_alarm' : 'notif_mute'}
				text={mute ? 'unmute' : 'mute'}
				onClick={() => toggleMute(mute)}
				opened={opened}
			/>
			<OptIcon name="check" text="mark as read" onClick={() => null} opened={opened} />
		</div>
	);
};

export default OptPanel;
