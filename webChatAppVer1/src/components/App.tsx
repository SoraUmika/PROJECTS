/**
 * Master Component.
 * See container Component at src\containers\app.ts
 */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Contact from './contact/Contact';
import Room from './room/Room';
import Pages from './globalComps/Pages';
import Context from '../context/Context';
import SettingType from '../redux/types/settingType';
import ThemeType from '../redux/types/themeType';
import Header from '../containers/header';
import Chat from '../containers/chat';
import Navigation from '../containers/navigation';
import CSS from '../css';

type Props = {
	pageIndex: 0 | 1 | 2;
	setting: SettingType;
	theme: ThemeType;
};

export default class App extends React.Component<Props> {
	render() {
		const { pageIndex, setting, theme } = this.props;
		return (
			<MuiThemeProvider
				theme={createMuiTheme({
					//Provide the theme for Mui.
					palette: {
						primary: {
							main: theme.colorMain
						},
						secondary: {
							main: theme.colorMain
						},
						action: {
							hover: theme.transMain
						}
					}
				})}
			>
				<Context.Provider
					value={{
						//Provide custom theme and setting.
						theme: theme,
						setting: setting
					}}
				>
					<Grid container style={CSS.fullH}>
						<Grid item xs={12} style={CSS.size({ height: '10%' })}>
							<Header />
						</Grid>
						<Grid item container xs={12} style={CSS.size({ height: '90%' })}>
							<Grid item xs={2}>
								<Navigation />
							</Grid>
							<Grid item container xs={10}>
								<Pages items={[ <Chat />, <Contact />, <Room /> ]} index={pageIndex} />
							</Grid>
						</Grid>
					</Grid>
				</Context.Provider>
			</MuiThemeProvider>
		);
	}
}
