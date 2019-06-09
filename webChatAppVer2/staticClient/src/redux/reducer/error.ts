import { Error } from "../State";
import Action from "../Action";
import { merge } from "../../util";

const reducer = (state: Error, action: Action): Error => {
	switch (action.type) {
		case "error/loginIdNotFound/<set>":
			return merge(state, {
				loginIdNotFound: action.payload.value
			});
		case "error/loginPasswordIncorrect/<set>":
			return merge(state, {
				loginPasswordIncorrect: action.payload.value
			});
		default:
			return state;
	}
};

export default reducer;
