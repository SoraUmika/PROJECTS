import {Config} from "../types/stateType";
import Action from "../types/actionTypes";
import {merge} from "./tool/toolFuncs";

export default function reducer(state: Config, action: Action): Config{
    switch (action.type){
        case "DATA::config::setting::<update>":
            return merge(state, {
                setting: merge(state.setting, action.payload)
            });
        case "DATA::config::theme::<update>":
            return merge(state, {
                theme: merge(state.theme, action.payload)
            });
        default:
            return state;
    }
}