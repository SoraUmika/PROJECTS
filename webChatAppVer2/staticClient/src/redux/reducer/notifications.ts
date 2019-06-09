import { Notifications } from "../State";
import Action from "../Action";
import { merge } from "../../util";

const reducer = (state: Notifications, action: Action): Notifications => {
	switch (action.type) {
		case "notifications/tempQueue/<add>":
			return merge(state, {
				tempQueue: [...state.tempQueue, action.payload]
			});
		case "notifications/tempQueue/<clean>":
			return merge(state, {
				tempQueue: []
			});
		case "notifications/persistQueue/<add>":
			return merge(state, {
				persistQueue: [...state.persistQueue, action.payload]
			});
		case "notifications/dialogOpen/<set>":
			return merge(state, {
				dialogOpen: action.payload.value
			});
		default:
			return state;
	}
};

export default reducer;
