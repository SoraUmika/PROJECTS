import {Header} from "../types/stateType";
import Action from "../types/actionTypes";
import {merge} from "./tool/toolFuncs";

export default function reducer(state: Header, action: Action): Header{
    switch (action.type){
        default:
            return state
    }
}