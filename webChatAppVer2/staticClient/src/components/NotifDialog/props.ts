export type NotifDialogReduxProps = {
	open: boolean;
};

export type NotifDialogProps = NotifDialogReduxProps & {
	onClose: () => any;
};
