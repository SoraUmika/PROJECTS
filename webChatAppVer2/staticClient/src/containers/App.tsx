import * as React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import AppBody from "./AppBody";
import AppHeader from "./AppHeader";

type Props = {};

const App: React.FC<Props> = props => {
	const {} = props;
	return (
		<MuiThemeProvider
			theme={createMuiTheme({
				palette: {
					primary: {
						main: "#000000"
					},
					secondary: {
						main: "#000000"
					}
				}
			})}
		>
			<AppHeader />
			<AppBody />
		</MuiThemeProvider>
	);
};

export default App;
