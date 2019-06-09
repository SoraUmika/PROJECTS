import * as React from "react";
import loadable from "@loadable/component";

import Loading from "../Loading";
import { SettingDialogProps } from "./props";
import jss from "../../jss";
import SideDialog from "../SideDialog";

const ROOT = jss("setting-dialog", {
	".action": {
		float: "right",
		padding: "8px"
	}
});

const LoadableComponent = loadable(() => import("./component"), {
	fallback: <Loading />
});

const SettingDialogLoadable: React.FC<SettingDialogProps> = props => {
	const { open, onClose } = props;
	return (
		<SideDialog open={open} onClose={onClose} className={ROOT}>
			<LoadableComponent {...props} />
		</SideDialog>
	);
};

export default SettingDialogLoadable;
