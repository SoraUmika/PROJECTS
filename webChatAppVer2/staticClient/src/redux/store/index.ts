import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import reducer from "../reducer";
import State from "../State";
import Action from "../Action";

const store = createStore<State, Action, {}, {}>(reducer, devToolsEnhancer({}));
export default store;
