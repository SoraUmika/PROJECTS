import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TransitionStatus } from "react-transition-group/Transition";

import NotifBase from "./NotifBase";
import { StrObject } from "../util";
import { TempNotifTypes } from "../containers/Notifier/Notification";
import Error from "./svg/Error";
import Info from "./svg/Info";
import Warning from "./svg/Warning";
import CheckCircle from "./svg/CheckCircle";
import jss from "../jss";

const ROOT = jss("temp-notif-body", {
	".message": {
		color: "rgba(0,0,0,0.50)",
		margin: "auto",
		"margin-left": "0px"
	}
});

export type TempNotifProps = {
	type: TempNotifTypes;
	message: string;
	onRemove: () => any;
	displayDuration: number;
	enterDuration: number;
	exitDuration: number;
	status?: TransitionStatus;
};

const typeParam: StrObject<[string, JSX.Element]> = {
	error: ["#ff0000", <Error nativeColor="#ff0000" />],
	warning: ["#ffa200", <Warning nativeColor="#ffa200" />],
	info: ["#2993ff", <Info nativeColor="#2993ff" />],
	success: ["#00c468", <CheckCircle nativeColor="#00c468" />]
};

const TempNotif: React.FC<TempNotifProps> = props => {
	const { message, type, onRemove, status, enterDuration, exitDuration, displayDuration } = props;
	const [color, icon] = typeParam[type];
	return (
		<NotifBase
			color={color}
			onRemove={onRemove}
			className={ROOT}
			status={status}
			enterDuration={enterDuration}
			exitDuration={exitDuration}
			displayDuration={displayDuration}
		>
			<Grid container>
				<Grid item xs={2}>
					{icon}
				</Grid>
				<Grid item container xs={10} spacing={8}>
					<Typography variant="subheading" className="message">
						{message}
					</Typography>
				</Grid>
			</Grid>
		</NotifBase>
	);
};

export default TempNotif;
