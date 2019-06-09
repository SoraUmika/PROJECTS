import {Navigation} from "../types/stateType";
import Action from "../types/actionTypes";
import {merge} from "./tool/toolFuncs";

export default function reducer(state: Navigation, action: Action): Navigation{
    switch (action.type){
        case "UI::navigation::pageNavIndex::<set>":
            return merge(state, {
                pageNavindex: action.payload.index
            });
        default:
            return state;
    }
}