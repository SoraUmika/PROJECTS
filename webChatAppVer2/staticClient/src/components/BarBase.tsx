import * as React from "react";
import Paper from "@material-ui/core/Paper";

import jss from "../jss";
import { clsNameStr } from "../util";

const ROOT = jss("bar-container", {
	"": {
		position: "relative",
		display: "flex",
		"align-items": "center",
		height: "100%"
	}
});

export type BarBaseProps = {
	className?: string;
};

const BarBase: React.FC<BarBaseProps> = props => {
	const { className } = props;
	return (
		<Paper square className={ROOT + clsNameStr(className)}>
			{props.children}
		</Paper>
	);
};

export default BarBase;
