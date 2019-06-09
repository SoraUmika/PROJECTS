import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import RootRef from "@material-ui/core/RootRef";
import { TransitionStatus } from "react-transition-group/Transition";
const anime = require("../anime").default;

import jss from "../jss";
import { AnimationManager } from "../util";

export const ROOT = jss("signup-form", {
	"": {
		padding: "32px",
		height: "auto",
		display: "inline-block",
		width: "25%",
		margin: "auto"
	},
	".input": {
		"margin-bottom": "16px",
		"margin-top": "0px",
		width: "100%"
	},
	".submit-button": {
		float: "right"
	},
	".login-button": {
		float: "left"
	},
	".error": {
		"margin-top": "16px"
	},
	".title": {
		"margin-bottom": "32px"
	},
	".pending-bar": {
		position: "absolute",
		width: "100%",
		top: "0px",
		left: "0px"
	}
});

type Value = {
	id: string;
	password: string;
	name: string;
	pwConfirm: string;
};

export type SignupFormReduxProps = {
	value: Value;
	idAlreadyExist: boolean;
};

export type SignupFormProps = SignupFormReduxProps & {
	onSubmit: (id: string, name: string, password: string) => any;
	onChange: (val: {
		signupValueId?: string;
		signupValueName?: string;
		signupValuePassword?: string;
		signupValuePwConfirm?: string;
	}) => any;
	onLogIn: (allowAnimation: boolean) => any;
	status?: TransitionStatus;
	pending: boolean;
};

export default class SignupForm extends React.Component<SignupFormProps> {
	compRef: React.RefObject<HTMLDivElement> = React.createRef();

	onEntering = () => {
		anime({
			targets: this.compRef.current,
			translateY: ["200%", "0%"],
			duration: 500,
			easing: "easeOutBack"
		});
	};

	onExiting = () => {
		anime({
			targets: this.compRef.current,
			translateY: "200%",
			duration: 500,
			easing: "easeInBack"
		});
	};

	animationManager = new AnimationManager(this.onEntering, this.onExiting);

	componentDidUpdate() {
		this.animationManager.animate(this.props.status);
	}

	render() {
		const {
			onChange,
			onLogIn,
			onSubmit,
			value: { id, password, name, pwConfirm },
			pending,
			idAlreadyExist
		} = this.props;
		return (
			<RootRef rootRef={this.compRef}>
				<Paper className={ROOT}>
					{pending && <LinearProgress className="pending-bar" />}
					<Typography variant="h3" className="title">
						Sign Up
					</Typography>
					<TextField
						label="Id"
						value={id}
						variant="outlined"
						margin="normal"
						onChange={event => onChange({ signupValueId: event.target.value })}
						className="input"
						error={idAlreadyExist}
					/>
					<br />
					<TextField
						label="Name"
						value={name}
						variant="outlined"
						margin="normal"
						onChange={event => onChange({ signupValueName: event.target.value })}
						className="input"
					/>
					<br />
					<TextField
						label="Password"
						autoComplete="current-password"
						type="password"
						margin="normal"
						value={password}
						variant="outlined"
						onChange={event => onChange({ signupValuePassword: event.target.value })}
						className="input"
					/>
					<br />
					<TextField
						label="Password confirmation"
						autoComplete="current-password"
						type="password"
						margin="normal"
						value={pwConfirm}
						variant="outlined"
						onChange={event => onChange({ signupValuePwConfirm: event.target.value })}
						className="input"
						error={pwConfirm !== "" && password !== pwConfirm}
					/>
					<br />
					<Button
						onClick={() => onLogIn(this.animationManager.allowAnimation)}
						className="login-button"
						variant="text"
						size="small"
					>
						Log in
					</Button>
					<Button
						onClick={() => onSubmit(id, name, password)}
						variant="contained"
						color="primary"
						className="submit-button"
						disabled={
							id === "" ||
							password === "" ||
							name === "" ||
							password !== pwConfirm ||
							pending
						}
					>
						Submit
					</Button>
				</Paper>
			</RootRef>
		);
	}
}
