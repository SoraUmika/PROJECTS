export type SettingDialogReduxProps = {
	open: boolean;
};

export type SettingDialogProps = SettingDialogReduxProps & {
	onClose: () => any;
};
