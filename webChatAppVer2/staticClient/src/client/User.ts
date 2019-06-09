import UserNetMode from "./UserNetMode";

type User = {
	name: string;
	id: string;
	avatar: string | null;
	network: UserNetMode;
};

export type SeverUser = {
	name: string;
	id: string;
	password: string;
	avatar: string | null;
	contact: string[];
	rooms: string[];
}

export default User;
