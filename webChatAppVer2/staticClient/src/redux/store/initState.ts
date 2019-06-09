import State from "../State";

const initState: State = {
	client: {
		user: "testId"
	},
	users: {
		testId: {
			id: "testId",
			name: "testName",
			avatar: null,
			network: "online"
		}
	},
	form: {
		loginValueId: "testId",
		loginValuePassword: "testPassword",
		loginPasswordVisible: false,
		signupValueId: "",
		signupValueName: "",
		signupValuePassword: "",
		signupValuePwConfirm: ""
	},
	error: {
		loginIdNotFound: false,
		loginPasswordIncorrect: false,
		SignupIdIsAlreadyExist: false
	},
	notifications: {
		persistStore: {},
		persistQueue: [],
		tempQueue: [],
		dialogOpen: false
	},
	loginPage: {
		pending: false,
		loginDisplay: true,
		signupDisplay: false
	},
	setting: {
		notificationDurationMode: "auto",
		notificationDurationDisplaying: 5000,
		notificationDurationEntering: 1000,
		notificationDurationExisting: 500,
		notificationPositionDisplay: "top",
		notificationPositionInsert: "bottom"
	},
	settingDialog: {
		open: false
	}
};

export default initState;
