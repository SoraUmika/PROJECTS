import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import jss from "../jss";

const ROOT = jss("loading", {
	"": {
		width: "100%",
		height: "100%",
		display: "flex"
	},
	".progress": {
		margin: "auto"
	}
});

const Loading: React.FC = () => {
	return (
		<div className={ROOT}>
			<div className="progress">
				<CircularProgress />
			</div>
		</div>
	);
};

export default Loading;
