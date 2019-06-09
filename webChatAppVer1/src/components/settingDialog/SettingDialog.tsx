/**
 * Master Component.
 * See container Component at src\containers\settingDialog.ts
 */
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import SettPages from './SettPages/SettPages';
import SettingType from '../../redux/types/settingType';
import ThemeType from '../../redux/types/themeType';
import Action from '../../redux/types/actionTypes';
import { StringObject } from '../../types';
import * as P from './props';
import NavItem from '../globalComps/NavItem';
import CSS from '../../css';
import { NAMES } from '../globalComps/Icon';

const styles = {
	dialogPaper: {
		minHeight: '90vh',
		maxHeight: '90vh'
	}
};

function Transition(props: any) {
	//Slide down animation.
	return <Slide direction="down" {...props} />;
}

type Props = {
	open: boolean;
	on_close: () => Action;
	classes: any;
	nav_index: 0 | 1;
	is_modified: boolean;
	settingState: P.SettingState;
	themeState: P.ThemeState;
	navOnClick: (index: 0 | 1) => Action;
	addSettingModif: (mods: Partial<SettingType>) => Action;
	addThemeModif: (mods: Partial<ThemeType>) => Action;
	closeDiscard: () => void;
	closeSave: (sett_mods: Partial<SettingType>, theme_mods: Partial<ThemeType>) => void;
	getVal: <T>(change: Partial<StringObject<T>>, origin: StringObject<T>, name: string) => any;
};

const settingPageNames: { icon: NAMES; text: string }[] = [
	{ icon: 'image', text: 'Display' },
	{ icon: 'account', text: 'Account' }
];

export default withStyles(styles)(
	class SettingDialog extends React.Component<Props, {}> {
		render() {
			const {
				open,
				classes,
				nav_index,
				navOnClick,
				is_modified,
				addSettingModif,
				addThemeModif,
				closeDiscard,
				closeSave,
				settingState,
				themeState,
				getVal
			} = this.props;
			return (
				<Dialog
					open={open}
					onClose={closeDiscard}
					TransitionComponent={Transition}
					fullWidth
					maxWidth="sm"
					classes={{ paper: classes.dialogPaper }}
				>
					<DialogTitle>SETTING</DialogTitle>
					<DialogContent style={CSS.padding({ left: '0px' })}>
						<Grid container spacing={24}>
							<Grid item xs={4}>
								<List>
									{settingPageNames.map(({ icon, text }, index: number) => {
										return (
											<NavItem
												text={text}
												icon={icon}
												onClick={navOnClick}
												id={index}
												select={index === nav_index}
												style={CSS.roundEdgeNav('20px')}
												key={index}
											/>
										);
									})}
								</List>
							</Grid>
							<Grid item xs={8}>
								<SettPages
									index={nav_index}
									getVal={getVal}
									settingProps={{
										...settingState,
										addSettingModif: addSettingModif
									}}
									themeProps={{
										...themeState,
										addThemeModif: addThemeModif
									}}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => closeSave(settingState.setting_changes, themeState.theme_changes)}
							color="primary"
							disabled={!is_modified}
						>
							Save
						</Button>
						<Button onClick={closeDiscard} color="primary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			);
		}
	}
);
