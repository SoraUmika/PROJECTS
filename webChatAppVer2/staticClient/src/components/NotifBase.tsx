import * as React from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { TransitionStatus } from "react-transition-group/Transition";
import RootRef from "@material-ui/core/RootRef";
import Tooltip from "@material-ui/core/Tooltip";

import jss from "../jss";
import Close from "./svg/Close";
import { clsNameStr, AnimationManager } from "../util";
import Pause from "./svg/Pause";
const anime = require("../anime").default;

const ROOT = jss("notif-base", {
	"": {
		width: "275px",
		padding: "0px",
		margin: "10px",
		"padding-left": "5px"
	},
	"$:hover": {
		"box-shadow":
			"0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
	},
	".close-icon": {
		position: "absolute",
		right: "0px",
		padding: "3px",
		margin: "3px"
	},
	".pause-icon": {
		position: "absolute",
		"font-size": "12px",
		right: "18px",
		margin: "6px",
		color: "rgba(0, 0, 0, 0.54)"
	},
	".close-icon svg": {
		"font-size": "12px"
	},
	".close-icon:hover svg": {
		color: "red"
	},
	".body": {
		padding: "17px"
	}
});

export type NotifBaseProps = {
	color: string;
	onRemove: () => any;
	status: TransitionStatus;
	displayDuration: number;
	enterDuration: number;
	exitDuration: number;
	className?: string;
};

type NotifBaseState = {
	pause: boolean;
};

class NotifBase extends React.Component<NotifBaseProps, NotifBaseState> {
	state: NotifBaseState = {
		pause: false
	};

	compRef: React.RefObject<HTMLDivElement> = React.createRef();

	animation: any;

	componentDidMount() {
		this.animation = anime({
			targets: this.compRef.current,
			backgroundColor: "rgb(255,255,255)",
			duration: this.props.displayDuration,
			easing: "linear",
			complete: this.props.onRemove
		});
	}

	onRightClick = () => {
		this.setState(prev => {
			if (prev.pause) {
				this.animation.play();
			} else {
				this.animation.pause();
			}
			return {
				pause: !prev.pause
			};
		});
	};

	onEntering = () => {
		anime({
			targets: this.compRef.current,
			translateX: [300, 0],
			easing: "easeInOutElastic(1, 0.5)",
			duration: this.props.enterDuration
		});
	};

	onExiting = () => {
		anime({
			targets: this.compRef.current,
			translateX: [0, 300],
			easing: "easeInElastic(1, 0.5)",
			duration: this.props.exitDuration
		});
	};

	animationManager = new AnimationManager(this.onEntering, this.onExiting);

	componentDidUpdate() {
		this.animationManager.animate(this.props.status);
	}

	render() {
		const { color, onRemove, className } = this.props;
		const { pause } = this.state;
		return (
			<RootRef rootRef={this.compRef}>
				<Paper
					className={ROOT + clsNameStr(className)}
					style={{ backgroundColor: color }}
					square
					onContextMenu={event => {
						event.preventDefault();
						this.onRightClick();
					}}
				>
					{pause && (
						<Tooltip title="paused">
							<Pause className="pause-icon" />
						</Tooltip>
					)}
					<Tooltip title="close">
						<IconButton className="close-icon" onClick={onRemove}>
							<Close fontSize="small" />
						</IconButton>
					</Tooltip>
					<Paper elevation={0} className="body" square>
						{this.props.children}
					</Paper>
				</Paper>
			</RootRef>
		);
	}
}

export default NotifBase;
