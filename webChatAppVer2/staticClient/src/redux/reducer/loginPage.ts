import { LoginPage } from "../State";
import Action from "../Action";
import { merge } from "../../util";

const reducer = (state: LoginPage, action: Action): LoginPage => {
	switch (action.type) {
		case "loginPage/pending/<set>":
			return merge(state, {
				pending: action.payload.value
			});
		case "loginPage/loginDisplay/<set>":
			return merge(state, {
				loginDisplay: action.payload.value
			});
		case "loginPage/signupDisplay/<set>":
			return merge(state, {
				signupDisplay: action.payload.value
			});
		default:
			return state;
	}
};

export default reducer;
