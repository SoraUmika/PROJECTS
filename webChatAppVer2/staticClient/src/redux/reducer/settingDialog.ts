import { SettingDialog } from "../State";
import Action from "../Action";
import { merge } from "../../util";

const reducer = (state: SettingDialog, action: Action): SettingDialog => {
	switch (action.type) {
		case "settingDialog/open/<set>":
			return merge(state, {
				open: action.payload.value
			});
		default:
			return state;
	}
};

export default reducer;
