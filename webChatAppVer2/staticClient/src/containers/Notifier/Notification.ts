export type TempNotifTypes = "success" | "error" | "info" | "warning";

export type TempNotif = {
	id: string;
	message: string;
	type: TempNotifTypes;
};

export type PersistNotif = {
	id: string;
};
