import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import client from "./client";
import App from "./containers/App";
import LoginPage from "./containers/LoginPage";
import Store from "./redux/store";
import Notifier from "./containers/Notifier";

client.init();
let w = window as any;
w.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
render(
	<Provider store={Store}>
		<Notifier />
		<HashRouter>
			<Switch>
				<Route exact path="/" component={() => <Redirect to="/login" />} />
				<Route path="/login" component={LoginPage} />
				<Route path="/app" component={App} />
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById("root")
);