import SettingType from "../../redux/types/settingType";
import Action from "../../redux/types/actionTypes";
import ThemeType from "../../redux/types/themeType";

export type SettingState = {
    origin_setting: SettingType,
    setting_changes: Partial<SettingType>,
}

export type Setting = SettingState & {addSettingModif: (mods: Partial<SettingType>) => Action};

export type ThemeState = {
    theme_changes: Partial<ThemeType>,
    origin_theme: ThemeType,
}

export type Theme = ThemeState & {addThemeModif: (mods: Partial<ThemeType>) => Action}