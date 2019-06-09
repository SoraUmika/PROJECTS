import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Avatar from "../src/components/Avatar";

var testUser = { name: "A", id: "B", avatar: null, network: "online" };

storiesOf("Avatar", module)
	.addWithJSX("no button", () => <Avatar user={testUser} />)
	.addWithJSX("botton", () => (
		<Avatar user={testUser} button onClick={action("clicked?")} />
	));
