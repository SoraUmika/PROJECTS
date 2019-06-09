import {StringObject} from "../../types";

type SettingType = {
    test: boolean
} & StringObject<any>

export default SettingType;