import { Client } from "../State";
import Action from "../Action";
import { merge } from "../../util";

const reducer = (state: Client, action: Action): Client => {
	switch (action.type) {
		case "client/user/<set>":
			return merge(state, {
				user: action.payload.id
			});
		default:
			return state;
	}
};

export default reducer;
