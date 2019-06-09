import React from "react";

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import BarBase from "../src/components/BarBase";

storiesOf("BarBase", module).addWithJSX("normal", () => (
	<BarBase>
		<div style={{ height: "100px" }} />
	</BarBase>
));
