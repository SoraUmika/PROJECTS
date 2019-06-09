import * as React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import BarBase from "../BarBase";
import Avatar from "../Avatar";
import jss from "../../jss";
import { AppBarProps } from "./props";
import Settings from "../svg/Settings";
import Notifications from "../svg/Notifications";

const ROOT = jss("app-bar", {
	"": {
		padding: "0px 16px"
	},
	".right-panel": {
		float: "right"
	},
	".avatar": {
		"margin-left": "12px"
	}
});

const AppBar: React.FC<AppBarProps> = props => {
	const { user, onClickAvatar, onClickSetting, onClickNotif } = props;
	return (
		<BarBase className={ROOT}>
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<div className="right-panel">
						<Tooltip title="setting">
							<IconButton onClick={onClickSetting}>
								<Settings />
							</IconButton>
						</Tooltip>
						<Tooltip title="Notification">
							<IconButton onClick={onClickNotif}>
								<Notifications />
							</IconButton>
						</Tooltip>
						<Avatar user={user} button onClick={onClickAvatar} className="avatar" />
					</div>
				</Grid>
			</Grid>
		</BarBase>
	);
};

export default AppBar;
