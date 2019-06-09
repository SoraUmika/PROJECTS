import * as React from "react";

import jss from "../jss";
import { random } from "../util";

/**
 * Credit: Chris Smith, August 4, 2017
 * https://codepen.io/chris22smith/pen/RZogMa
 */

const ROOT = jss("login-background", {
	".bg": {
		animation: "slide 3s ease-in-out infinite alternate",
		bottom: 0,
		left: "-50%",
		opacity: 0.5,
		position: "fixed",
		right: "-50%",
		top: 0,
		"z-index": -1
	},
	".bg2": {
		"animation-direction": "alternate-reverse",
		"animation-duration": "4s"
	},
	".bg3": {
		"animation-duration": "5s"
	}
});

type LoginBgState = {
	color: number;
};

export default class LoginBg extends React.Component<{}, LoginBgState> {
	state: LoginBgState = {
		color: random(0, 359)
	};
	timerId: NodeJS.Timeout;

	componentDidMount() {
		this.timerId = setInterval(() => this.tick(), 100);
	}

	tick = () => {
		this.setState(prev => {
			const { color } = prev;
			return {
				color: color >= 359 ? 0 : color + 1
			};
		});
	};

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	render() {
		const { color } = this.state;
		const style = {
			backgroundImage:
				"linear-gradient(-60deg, hsl(" +
				color +
				",50%,50%) 50%, hsl(" +
				color +
				",50%,80%) 50%)"
		};
		return (
			<div className={ROOT}>
				<div className="bg" style={style} />
				<div className="bg bg2" style={style} />
				<div className="bg bg3" style={style} />
			</div>
		);
	}
}
