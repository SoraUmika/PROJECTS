import * as React from "react";
import loadable from "@loadable/component";

import Loading from "../Loading";
import { NotifDialogProps } from "./props";
import jss from "../../jss";
import SideDialog from "../SideDialog";

const ROOT = jss("notif-dialog", {});

const LoadableComponent = loadable(() => import("./component"), {
	fallback: <Loading />
});

const NotifDialogLoadable: React.FC<NotifDialogProps> = props => {
	const { open, onClose } = props;
	return (
		<SideDialog open={open} onClose={onClose} className={ROOT}>
			<LoadableComponent {...props} />
		</SideDialog>
	);
};

export default NotifDialogLoadable;
