import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import State from "../redux/State";
import AppBar from "../components/AppBar";
import { AppBarReduxProps } from "../components/AppBar/props";
import jss from "../jss";
import SettingDialog from "../components/SettingDialog";
import { SettingDialogReduxProps } from "../components/SettingDialog/props";
import * as actions from "../redux/actions";
import NotifDialog from "../components/NotifDialog";
import { NotifDialogReduxProps } from "../components/NotifDialog/props";

const ROOT = jss("app-header", {
	"": {
		height: "10%"
	}
});

const mapStateToProps = (state: State) => {
	const {
		client: { user },
		settingDialog: { open },
		notifications: { dialogOpen }
	} = state;
	return {
		appBarProps: {
			user: state.users[user]
		},
		settingDialogProps: {
			open: open
		},
		notifDialogProps: {
			open: dialogOpen
		}
	};
};

type Props = RouteComponentProps & {
	appBarProps: AppBarReduxProps;
	settingDialogProps: SettingDialogReduxProps;
	notifDialogProps: NotifDialogReduxProps;
};

const AppHeader: React.FC<Props> = props => {
	const { appBarProps, settingDialogProps, notifDialogProps } = props;

	const appBarFunc = {
		onClickAvatar: (): any => null,
		onClickSetting: () => actions.SetSettingDialogOpen(true),
		onClickNotif: () => actions.SetNotificationDialogOpen(true)
	};

	const settingDialogFunc = {
		onClose: () => actions.SetSettingDialogOpen(false)
	};

	const notifDialogFunc = {
		onClose: () => actions.SetNotificationDialogOpen(false)
	};

	return (
		<div className={ROOT}>
			<AppBar {...appBarProps} {...appBarFunc} />
			<SettingDialog {...settingDialogProps} {...settingDialogFunc} />
			<NotifDialog {...notifDialogProps} {...notifDialogFunc} />
		</div>
	);
};

export default withRouter(connect(mapStateToProps)(AppHeader));
