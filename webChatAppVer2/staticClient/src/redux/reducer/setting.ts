import { Setting } from "../State";
import Action from "../Action";
import { merge } from "../../util";

const reducer = (state: Setting, action: Action): Setting => {
	switch (action.type) {
		case "setting/<update>":
			return merge(state, action.payload);
		default:
			return state;
	}
};

export default reducer;
