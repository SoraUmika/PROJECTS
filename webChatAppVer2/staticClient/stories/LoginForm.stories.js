import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import LoginForm from "../src/components/LoginForm";

storiesOf("LoginForm", module)
	.addWithJSX("initial", () => (
		<LoginForm
			value={{ id: "", password: "" }}
			onSubmit={action("submit")}
			onChange={action("typed")}
			onSignUp={action("sign up")}
		/>
	))
	.addWithJSX("typed", () => (
		<LoginForm
			value={{ id: "id", password: "password" }}
			onSubmit={action("submit")}
			onChange={action("typed")}
			onSignUp={action("sign up")}
		/>
	));
