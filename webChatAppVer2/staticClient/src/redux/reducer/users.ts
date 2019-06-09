import { Users } from "../State";
import Action from "../Action";
import { merge } from "../../util";

const reducer = (state: Users, action: Action): Users => {
	switch (action.type) {
		case "users/<add>":
			return { ...state, [action.payload.id]: action.payload };
		case "users/<clean>":
			return {};
		case "users/network/<set>":
			return merge(state, {
				[action.payload.id]: {
					...state[action.payload.id],
					network: action.payload.value
				}
			});
		default:
			return state;
	}
};

export default reducer;
