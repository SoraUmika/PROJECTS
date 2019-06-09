let test_file_input = { //TODO Change this when imp setting.json!!!
    test: false,
    //*DEV OPTIONS
    dev_mainNavType: 0
};

export default class SettingManager{
    values: {[key: string]: any}

    constructor(public update_cb: Function){
        this.values = test_file_input
    }

    get(name: string){
        return this.values[name];
    }

    save(change_list: {[key: string]: any}){
        let key: string;
        for (key in change_list){
            this.values[key] = change_list[key];
        }
        this.update_cb();
    }
}