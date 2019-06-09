import User from "../../client/User";

export type AppBarReduxProps = {
	user: User;
};

export type AppBarProps = AppBarReduxProps & {
	onClickAvatar: () => any;
	onClickSetting: () => any;
	onClickNotif: () => any;
};
