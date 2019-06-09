type UserId = string;
type RoomId = string;
type StringObject<T> = { [index: string]: T };

export type User = {
	name: string;
	id: UserId;
	password: string;
	avatar: string | null;
	contact: UserId[];
	rooms: RoomId[];
};

type Data = {
	users: StringObject<User>;
	online: UserId[];
};

class DataManager {
	data: Data;

	constructor() {
		this.data = {
			users: {
				testId: {
					name: "testName",
					id: "testId",
					password: "testPassword",
					avatar: null,
					contact: [],
					rooms: []
				}
			},
			online: []
		};
	}

	isUserExist(id: UserId) {
		return id in this.data.users;
	}

	getUser(id: UserId) {
		return this.data.users[id];
	}

	addUser(id: UserId, name: string, password: string) {
		this.data.users[id] = {
			name: name,
			id: id,
			password: password,
			avatar: null,
			contact: [],
			rooms: []
		};
	}

	setAsOnlineUser(id: UserId) {
		this.data.online.push(id);
	}
}

export default new DataManager();
