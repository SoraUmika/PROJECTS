import * as React from "react";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import jss from "../jss";
import { clsNameStr } from "../util";

const ROOT = jss("side-dialog", {
	".MuiPaper-root-1": {
		position: "absolute",
		right: "0px",
		top: "0px",
		"max-height": "calc(100% - 32px)",
		margin: "16px",
		height: "100%",
		width: "100%"
	}
});

function Transition(props: any) {
	return <Slide direction="left" {...props} />;
}

const SideDialog: React.FC<DialogProps> = props => {
	return (
		<Dialog
			{...props}
			className={ROOT + clsNameStr(props.className)}
			TransitionComponent={Transition}
		/>
	);
};

export default SideDialog;
