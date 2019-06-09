import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AppBar from "../src/components/AppBar";
import Loading from "../src/components/AppBar/loading";

var testUser = { name: "A", id: "B", avatar: null, network: "online" };

storiesOf("AppBar", module)
	.addWithJSX("normal", () => (
		<div style={{ height: "70px" }}>
			<AppBar user={testUser} onClickAvatar={action("clicked avatar")} />
		</div>
	))
	.addWithJSX("loading", () => (
		<div style={{ height: "70px" }}>
			<Loading />
		</div>
	));
