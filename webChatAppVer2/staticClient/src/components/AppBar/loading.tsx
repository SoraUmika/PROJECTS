import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import BarBase from "../BarBase";
import jss from "../../jss";

const ROOT = jss("app-bar-loading", {
	div: {
		width: "100%",
		top: "0px",
		position: "absolute"
	}
});

const AppBarLoading: React.FC<{}> = props => {
	return (
		<BarBase className={"app-bar " + ROOT}>
			<LinearProgress />
		</BarBase>
	);
};

export default AppBarLoading;
