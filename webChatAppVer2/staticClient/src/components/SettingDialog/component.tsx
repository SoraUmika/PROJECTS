import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { SettingDialogProps } from "./props";
import ListItem from "../ListItem";

const SettingDialog: React.FC<SettingDialogProps> = props => {
	return (
		<React.Fragment>
			<DialogTitle>
				<Typography>Setting</Typography>
			</DialogTitle>
			<DialogContent>
				<ListItem>Hello</ListItem>
			</DialogContent>
			<DialogActions className="action">
				<Button>cancel</Button>
				<Button variant="contained">save</Button>
			</DialogActions>
		</React.Fragment>
	);
};

export default SettingDialog;
