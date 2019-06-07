import {SettingDialog, Config} from "../types/stateType";
import Action from "../types/actionTypes";
import {merge, updateChanges} from "./tool/toolFuncs";

export default function reducer(state: SettingDialog, action: Action, cf: Config): SettingDialog{
    switch (action.type){
        case "UI::settingDialog::open::<toggle>":
            return merge(state, {
                open: action.payload.bool
            });
        case "UI::settingDialog::navIndex::<set>":
            return merge(state, {
                navIndex: action.payload.index
            });
        case "UI::settingDialog::tempConfig::<reset>":
            return merge(state, {
                isModified: false,
                settingChanges: {},
                themeChanges: {}
            });
        case "UI::settingDialog::settingChanges::<update>":
            let updatedSett = updateChanges(state.settingChanges, action.payload, cf.setting);
            return merge(state, {
                isModified: Object.keys(updatedSett).length !== 0,
                settingChanges: updatedSett
            });
        case "UI::settingDialog::themeChanges::<update>":
            let updatedTheme = updateChanges(state.themeChanges, action.payload, cf.theme);
            return merge(state, {
                isModified: Object.keys(updatedTheme).length !== 0,
                themeChanges: updatedTheme
            });
        default:
            return state;
    }
}