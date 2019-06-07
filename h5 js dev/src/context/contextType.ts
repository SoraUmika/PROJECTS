import ThemeType from "../redux/types/themeType";
import SettingType from "../redux/types/settingType";

export default interface ContextType{
    theme: ThemeType,
    setting: SettingType
}