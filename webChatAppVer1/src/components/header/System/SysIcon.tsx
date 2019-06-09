import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';

type Props = {
	onClick: () => any;
	style?: React.CSSProperties;
};

type State = {
	hover: boolean;
};

export default class SysIcon extends React.Component<Props, State> {
	state: State = {
		hover: false
	};

	onEnter = () => {
		this.setState({ hover: true });
	};

	onLeave = () => {
		this.setState({ hover: false });
	};

	render() {
		const { children, onClick, style } = this.props;
		const { hover } = this.state;
		return (
			<IconButton
				color={hover ? 'primary' : 'default'}
				onClick={onClick}
				onMouseEnter={this.onEnter}
				onMouseLeave={this.onLeave}
				style={style}
			>
				{children}
			</IconButton>
		);
	}
}
