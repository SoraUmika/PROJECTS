import { Form } from "../State";
import Action from "../Action";
import { merge } from "../../util";

const reducer = (state: Form, action: Action): Form => {
	switch (action.type) {
		case "form/login/value/<set>":
			return merge(state, action.payload);
		case "form/login/passwordVisible/<set>":
			return merge(state, {
				loginPasswordVisible: action.payload.value
			});
		case "form/signup/value/<set>":
			return merge(state, action.payload);
		default:
			return state;
	}
};

export default reducer;
