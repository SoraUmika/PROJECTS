import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { NotifDialogProps } from "./props";

const NotifDialog: React.FC<NotifDialogProps> = props => {
	return (
		<React.Fragment>
			<DialogTitle>
				<Typography>Notification</Typography>
			</DialogTitle>
			<DialogContent />
			<DialogActions />
		</React.Fragment>
	);
};

export default NotifDialog;
