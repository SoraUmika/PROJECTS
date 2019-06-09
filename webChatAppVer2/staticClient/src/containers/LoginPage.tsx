import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Transition } from "react-transition-group";
import LinearProgress from "@material-ui/core/LinearProgress";

import State from "../redux/State";
import jss from "../jss";
import LoginForm, { LoginFormReduxProps } from "../components/LoginForm";
import SignupForm, { SignupFormReduxProps } from "../components/SignupForm";
import client from "../client";
import { LoginResponse, SignupResponse } from "../client/Packages";
import * as actions from "../redux/actions";

const ROOT = jss("login-page", {
	"": {
		height: "100%",
		"text-align": "center",
		display: "flex"
	},
	".top-pad": {
		height: "25%"
	},
	".pending-bar": {
		position: "absolute",
		width: "100%",
		top: "0px",
		left: "0px"
	}
});

const mapStateToProps = (state: State) => {
	const {
		form: {
			loginValueId,
			loginPasswordVisible,
			loginValuePassword,
			signupValueId,
			signupValueName,
			signupValuePassword,
			signupValuePwConfirm
		},
		error: { loginIdNotFound, loginPasswordIncorrect, SignupIdIsAlreadyExist },
		loginPage: { pending, loginDisplay, signupDisplay }
	} = state;
	return {
		loginFormProps: {
			value: {
				id: loginValueId,
				password: loginValuePassword
			},
			idNotFound: loginIdNotFound,
			passwordIncorrect: loginPasswordIncorrect,
			passwordVisible: loginPasswordVisible
		},
		signupFormProps: {
			value: {
				id: signupValueId,
				name: signupValueName,
				password: signupValuePassword,
				pwConfirm: signupValuePwConfirm
			},
			idAlreadyExist: SignupIdIsAlreadyExist
		},
		pending: pending,
		loginDisplay: loginDisplay,
		signupDisplay: signupDisplay
	};
};

export type LoginPageProps = RouteComponentProps & {
	loginFormProps: LoginFormReduxProps;
	signupFormProps: SignupFormReduxProps;
	pending: boolean;
	loginDisplay: boolean;
	signupDisplay: boolean;
};

const LoginPage: React.FC<LoginPageProps> = props => {
	const {
		history,
		loginFormProps,
		signupFormProps,
		pending,
		loginDisplay,
		signupDisplay
	} = props;

	const loginFormFunc = {
		onSubmit: (id: string, password: string) => {
			actions.setLoginPagePending(true);
			client.login(id, password);
			client.registerTempListener("login-response", (pk: LoginResponse) => {
				actions.setLoginPagePending(false);
				if (pk.success) {
					history.push("/app");
				}
			});
		},

		onSignUp: (allowAnimation: boolean) => {
			if (allowAnimation) {
				actions.setLoginPageLoginDisplay(false);
			} else {
				actions.addNotifToTempQueue({ type: "warning", message: "Please try again." });
			}
		},

		onChange: actions.setLoginFormValues,

		togglePasswordVisible: (val: boolean) => {
			actions.setLoginFormPasswordVisible(!val);
		}
	};

	const signupFormFunc = {
		onSubmit: (id: string, name: string, password: string) => {
			actions.setLoginPagePending(true);
			client.signup(id, name, password);
			client.registerTempListener("signup-response", (pk: SignupResponse) => {
				actions.setLoginPagePending(false);
			});
		},

		onChange: actions.setSignupFormValues,

		onLogIn: (allowAnimation: boolean) => {
			if (allowAnimation) {
				actions.setLoginPageSignupDisplay(false);
			} else {
				actions.addNotifToTempQueue({ type: "warning", message: "Please try again." });
			}
		}
	};

	return (
		<div className={ROOT}>
			{pending && <LinearProgress className="pending-bar" />}
			<Transition
				in={loginDisplay}
				timeout={500}
				appear
				mountOnEnter
				unmountOnExit
				onExited={() => actions.setLoginPageSignupDisplay(true)}
			>
				{status => (
					<LoginForm
						{...loginFormProps}
						{...loginFormFunc}
						status={status}
						pending={pending}
					/>
				)}
			</Transition>
			<Transition
				in={signupDisplay}
				timeout={500}
				mountOnEnter
				unmountOnExit
				onExited={() => actions.setLoginPageLoginDisplay(true)}
			>
				{status => (
					<SignupForm
						{...signupFormProps}
						{...signupFormFunc}
						status={status}
						pending={pending}
					/>
				)}
			</Transition>
		</div>
	);
};

export default withRouter(connect(mapStateToProps)(LoginPage));
