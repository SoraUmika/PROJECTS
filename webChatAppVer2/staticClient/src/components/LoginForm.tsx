import * as React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RootRef from "@material-ui/core/RootRef";
import { TransitionStatus } from "react-transition-group/Transition";
const anime = require("../anime").default;

import VisibilityOutline from "./svg/VisibilityOutline";
import VisibilityOffOutline from "./svg/VisibilityOffOutline";
import jss from "../jss";
import { AnimationManager } from "../util";

export const ROOT = jss("login-form", {
	"": {
		padding: "32px",
		height: "auto",
		display: "inline-block",
		width: "25%",
		margin: "auto"
	},
	".login-form-input": {
		"margin-bottom": "16px",
		"margin-top": "0px",
		width: "100%"
	},
	".login-form-submit-button": {
		float: "right"
	},
	".login-form-signup-button": {
		float: "left"
	},
	".login-form-error": {
		"margin-top": "16px"
	},
	".title": {
		"margin-bottom": "32px"
	}
});

type Value = {
	id: string;
	password: string;
};

export type LoginFormReduxProps = {
	value: Value;
	idNotFound?: boolean;
	passwordIncorrect?: boolean;
	passwordVisible: boolean;
};

export type LoginFormProps = LoginFormReduxProps & {
	onSubmit: (id: string, password: string) => any;
	onChange: (val: { loginValueId?: string; loginValuePassword?: string }) => any;
	onSignUp: (allowAnimation: boolean) => any;
	togglePasswordVisible: (val: boolean) => any;
	status?: TransitionStatus;
	pending: boolean;
};

export default class LoginPage extends React.Component<LoginFormProps> {
	compRef: React.RefObject<HTMLDivElement> = React.createRef();

	onEntering = () => {
		anime({
			targets: this.compRef.current,
			translateY: ["-200%", "0%"],
			duration: 500,
			easing: "easeOutBack"
		});
	};

	onExiting = () => {
		anime({
			targets: this.compRef.current,
			translateY: "-200%",
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
			onSignUp,
			onSubmit,
			value: { id, password },
			idNotFound,
			passwordIncorrect,
			pending,
			passwordVisible,
			togglePasswordVisible
		} = this.props;
		return (
			<RootRef rootRef={this.compRef}>
				<Paper className={ROOT}>
					<Typography variant="h3" className="title">
						Log In
					</Typography>
					<TextField
						label="Id"
						value={id}
						variant="outlined"
						margin="normal"
						onChange={event => onChange({ loginValueId: event.target.value })}
						className="login-form-input"
						error={idNotFound}
					/>
					<br />
					<TextField
						label="Password"
						autoComplete="current-password"
						type={passwordVisible ? "text" : "password"}
						margin="normal"
						value={password}
						variant="outlined"
						onChange={event => onChange({ loginValuePassword: event.target.value })}
						className="login-form-input"
						error={passwordIncorrect}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Tooltip
										title={
											passwordVisible
												? "password is shown"
												: "password is hidden"
										}
									>
										<IconButton
											onClick={() => togglePasswordVisible(passwordVisible)}
										>
											{passwordVisible ? (
												<VisibilityOutline />
											) : (
												<VisibilityOffOutline />
											)}
										</IconButton>
									</Tooltip>
								</InputAdornment>
							)
						}}
					/>
					<br />
					<Button
						onClick={() => onSignUp(this.animationManager.allowAnimation)}
						className="login-form-signup-button"
						variant="text"
						size="small"
					>
						Sign up
					</Button>
					<Button
						onClick={() => onSubmit(id, password)}
						variant="contained"
						color="primary"
						className="login-form-submit-button"
						disabled={id === "" || password === "" || pending}
					>
						Submit
					</Button>
				</Paper>
			</RootRef>
		);
	}
}
