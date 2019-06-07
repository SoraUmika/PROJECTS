import {connect} from "react-redux";

import {State} from "../redux/types/stateType";
import Dispatch from "../redux/types/dispatchType";
import SettingType from "../redux/types/settingType";
import ThemeType from "../redux/types/themeType";
import SettingDialog from "../components/settingDialog/SettingDialog";
import { StringObject } from "../types";

const mapStateToProps = (state: State) => {
    const {navIndex, isModified, settingChanges, themeChanges} = state.settingDialog;
    const {setting, theme} = state.config;
    return {
        nav_index: navIndex,
        is_modified: isModified,
        settingState: {
            setting_changes: settingChanges,
            origin_setting: setting,
        },
        themeState: {
            theme_changes: themeChanges,
            origin_theme: theme
        }
    };
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
    navOnClick: (index: 0 | 1) => dispatch({
        type: "UI::settingDialog::navIndex::<set>",
        payload: {index: index}
    }),
    addSettingModif: (mods: Partial<SettingType>) => dispatch({
        type: "UI::settingDialog::settingChanges::<update>",
        payload: mods
    }),
    addThemeModif: (mods: Partial<ThemeType>) => dispatch({
        type: "UI::settingDialog::themeChanges::<update>",
        payload: mods
    }),
    closeDiscard: () => {
        dispatch({
            type: "UI::settingDialog::tempConfig::<reset>"
        });
        ownProps.on_close();
    },
    closeSave: (sett_mods: Partial<SettingType>, theme_mods: Partial<ThemeType>) => {
        dispatch({
            type: "DATA::config::setting::<update>",
            payload: sett_mods
        });
        dispatch({
            type: "DATA::config::theme::<update>",
            payload: theme_mods
        });
        dispatch({
            type: "UI::settingDialog::tempConfig::<reset>"
        });
        ownProps.on_close();
    },
    getVal: <T>(change: Partial<StringObject<T>>, origin: StringObject<T>, name: string) => {
        if (name in change){
            return change[name];
        }else{
            return origin[name];
        }
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingDialog);