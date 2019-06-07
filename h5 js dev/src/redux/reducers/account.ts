import {Account} from "../types/stateType";
import Action from "../types/actionTypes";
import {merge} from "./tool/toolFuncs";

export default function reducer(state: Account, action: Action): Account{
    switch (action.type){
        default:
            return state;
    }
}