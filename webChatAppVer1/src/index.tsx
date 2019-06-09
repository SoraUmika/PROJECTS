import * as React from "react";
import {render} from "react-dom";
import { Provider } from 'react-redux'

import App from "./containers/app";
import Store from "./redux/store";

let w = window as any; //Enable Mui v2 typography.
w.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

render(<Provider store={Store}><App/></Provider>,document.getElementById("root"));